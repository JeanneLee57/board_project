import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Image from "next/image";
import { connectDB } from "@/util/database";
import { Item } from "../board/ItemList";
import ItemList from "../board/ItemList";

//로그인 페이지를 만들어서 그쪽으로 리다이렉팅할지, 에러 메시지를 띄운 뒤 n초 뒤 메인으로 이동하게 할지 결정
export default async function Mypage() {
  let db = (await connectDB).db("forum");

  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  const items: Item[] = await db
    .collection<Item>("post")
    .find({ author: session.user!.name! })
    .sort({ date: -1 })
    .toArray();

  return (
    <main className="flex flex-col justify-center items-center">
      <Image
        className="rounded-full my-12"
        src={session.user!.image!}
        alt="유저 프로필"
        width={200}
        height={200}
      />
      <h1 className="mb-12">{session.user!.name}</h1>
      <div className="w-3/4 mb-12">
        <h2 className="mb-4 pb-4 pl-1 border-b border-gray-400 w-1/3">
          내가 쓴 글
        </h2>
        <ItemList items={items} />
      </div>
    </main>
  );
}
