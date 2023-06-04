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
  const sessionRes = await getServerSession(req, res, authOptions);
  if (!sessionRes) {
    res.status(500).send("접근 권한이 없습니다");
    return;
  }
  /* 유저 정보에 업데이트 */
  const testDb = (await connectDB).db("test");
  const forumDb = (await connectDB).db("forum");
  const userInfo: UserInfo | null = await testDb
    .collection<UserInfo>("users")
    .findOne({ name: sessionRes.user!.name! });
  if (!userInfo) {
    res.status(500).send("유저 정보를 찾을 수 없습니다");
    return;
  }
  const item: Item | null = await forumDb
    .collection<Item>("post")
    .findOne({ _id: new ObjectId(req.query.postId as string) });
  if (!item) {
    res.status(500).send("게시물을 찾을 수 없습니다");
    return;
  }
  const commentArr = item.comment;
  const commentToUpdateIndex = commentArr.findIndex(
    (el) => el.id === req.query.commentId
  );
  const commentToUpdate = commentArr[commentToUpdateIndex];
  const likesToUpdate = userInfo.likes || { post: [], comment: [] };
  if (req.method == "POST") {
    //유저 정보 업데이트
    likesToUpdate.comment = [
      ...likesToUpdate.comment,
      req.query.commentId as string,
    ];
    //아이템 정보 업데이트: 아이템의 댓글 배열에서 해당하는 댓글을 찾아서 좋아요 수를 업데이트 하고 다시 배열에 넣어준다.
    commentToUpdate.likes = (parseInt(commentToUpdate.likes) + 1).toString();
    commentArr.splice(commentToUpdateIndex, 1, commentToUpdate);
    let update = await forumDb.collection("post").updateOne(
      { _id: new ObjectId(req.query.postId as string) },
      {
        $set: {
          comment: commentArr,
        },
      }
    );
  }
  if (req.method === "DELETE") {
    const commentIndex = likesToUpdate.comment.findIndex(
      (el) => req.body.commentId as string
    );
    likesToUpdate.comment.splice(commentIndex, 1);

    commentToUpdate.likes = (parseInt(commentToUpdate.likes) - 1).toString();
    commentArr.splice(commentToUpdateIndex, 1, commentToUpdate);
    let update = await forumDb.collection("post").updateOne(
      { _id: new ObjectId(req.query.postId as string) },
      {
        $set: {
          comment: commentArr,
        },
      }
    );
  }

  let result = await testDb.collection("users").updateOne(
    { name: sessionRes.user!.name! },
    {
      $set: {
        likes: likesToUpdate,
      },
    }
  );
  res.status(200).json("좋아요!");
}
