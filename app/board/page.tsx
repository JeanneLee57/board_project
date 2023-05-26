import ItemList from "./ItemList";
import { connectDB } from "@/util/database";

export default async function Board() {
  //쿼리파라미터 페이지 값을 받으면 해당하는 페이지의 글 목록을 끊어서 표시하도록
  const client = await connectDB;
  const db = client.db("forum");
  const items = await db.collection("post").find().toArray();
  return (
    <div className="h-full">
      <h1 className="h-full">게시글 페이지</h1>
      <ItemList items={items} />
    </div>
  );
}
