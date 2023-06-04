import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
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

  const likesToUpdate = userInfo.likes || { post: [], comment: [] };
  if (req.method == "POST") {
    likesToUpdate.post = [...likesToUpdate.post, req.query.postId as string];
    const updatedLikes = (parseInt(item.likes) + 1).toString();
    let update = await forumDb.collection("post").updateOne(
      { _id: new ObjectId(req.query.postId as string) },
      {
        $set: {
          likes: updatedLikes,
        },
      }
    );
  }
  if (req.method === "DELETE") {
    const postIndex = likesToUpdate.post.findIndex(
      (el) => req.body.postId as string
    );
    likesToUpdate.post.splice(postIndex, 1);
    const updatedLikes = (parseInt(item.likes) - 1).toString();
    let update = await forumDb.collection("post").updateOne(
      { _id: new ObjectId(req.query.postId as string) },
      {
        $set: {
          likes: updatedLikes,
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
