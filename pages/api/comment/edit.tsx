import { Item } from "@/app/board/ItemList";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const db = (await connectDB).db("forum");
    const itemToUpdate: Item | null = await db
      .collection<Item>("post")
      .findOne({ _id: new ObjectId(req.body.postId) });
    if (!itemToUpdate) {
      res.status(500).send("게시물을 찾을 수 없습니다.");
      return;
    }
    const commentArr = itemToUpdate.comment;
    const commentToUpdateIndex = commentArr.findIndex(
      (el) => el.id === req.body.commentId
    );
    const commentToUpdate = commentArr[commentToUpdateIndex];
    commentToUpdate.content = req.body.content;
    commentArr.splice(commentToUpdateIndex, 1, commentToUpdate);
    let result = await db.collection("post").updateOne(
      { _id: new ObjectId(req.body.postId) },
      {
        $set: {
          comment: commentArr,
        },
      }
    );
    res.redirect(302, `/board/detail/${req.body.postId}`);
  }
}
