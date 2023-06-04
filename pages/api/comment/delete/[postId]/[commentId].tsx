import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { UserInfo } from "@/app/board/detail/[postId]/page";
import { Item } from "@/app/board/ItemList";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = (await connectDB).db("forum");
  const itemToUpdate: Item | null = await db
    .collection<Item>("post")
    .findOne({ _id: new ObjectId(req.query.postId as string) });
  if (!itemToUpdate) {
    res.status(500).send("게시물을 찾을 수 없습니다.");
    return;
  }
  if (req.method == "DELETE") {
    const commentArr = itemToUpdate.comment;
    const commentToUpdateIndex = commentArr.findIndex(
      (el) => el.id === req.query.commentId
    );
    commentArr.splice(commentToUpdateIndex, 1);
    let result = await db.collection("post").updateOne(
      { _id: new ObjectId(req.query.postId as string) },
      {
        $set: {
          comment: commentArr,
        },
      }
    );
    res.status(200).json("댓글 삭제!");
  }
}
