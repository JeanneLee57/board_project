import { connectDB } from "@/util/database";
import { UserInfo } from "../detail/[postId]/page";
import ItemList, { Item } from "../ItemList";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import { ObjectId } from "mongodb";

export default async function Likes() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  const testDb = (await connectDB).db("test");
  const forumDb = (await connectDB).db("forum");
  const userInfo: UserInfo | null = await testDb
    .collection<UserInfo>("users")
    .findOne({ name: session.user!.name! });
  if (!userInfo) {
    return <h2>유저 정보를 찾을 수 없습니다.</h2>;
  }
  const userLikes = userInfo.likes
    ? userInfo.likes.post.map((el) => new ObjectId(el))
    : [];

  const likedPosts = await forumDb
    .collection<Item>("post")
    .find({ _id: { $in: userLikes } })
    .sort({ date: -1 })
    .toArray();

  if (!likedPosts.length) return <h2>좋아요한 글이 없습니다.</h2>;

  return (
    <main className="h-full w-full mt-12 mb-20">
      <h1 className="h-full w-80 border-b border-gray-400 pb-6 mb-4">
        좋아요한 글
      </h1>
      <ItemList items={likedPosts} />
    </main>
  );
}
