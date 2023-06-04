import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { Item, Comment } from "@/app/board/ItemList";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

type KeysToAdd = Pick<Comment, "author" | "date" | "likes">;

//원래 코멘트를 받아오고, 새 코멘트를 unshift해서 다시 업데이트
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const sessionRes = await getServerSession(req, res, authOptions);
    if (!sessionRes) {
      res.status(500).send("접근 권한이 없습니다");
      return;
    }
    const tzoffset = new Date().getTimezoneOffset() * 60000;
    const localISOTime = new Date(Date.now() - tzoffset)
      .toISOString()
      .slice(0, -1);
    const keysToAdd: KeysToAdd = {
      author: sessionRes.user!.name!,
      date: localISOTime,
      likes: "0",
    };
    const db = (await connectDB).db("forum");
    const item: Item | null = await db
      .collection<Item>("post")
      .findOne({ _id: new ObjectId(req.body._id) });

    if (!item) {
      res.status(500).send("게시물을 찾을 수 없습니다.");
      return;
    }
    const commentToUpdate = item.comment;
    commentToUpdate.unshift({
      id: commentToUpdate.length + "",
      content: req.body.content,
      ...keysToAdd,
    });
    let result = await db.collection("post").updateOne(
      { _id: new ObjectId(req.body._id) },
      {
        $set: { comment: commentToUpdate },
      }
    );
    res.redirect(302, `/board/detail/${item._id}`);
  }
}
