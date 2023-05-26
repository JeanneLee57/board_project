import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database";
import ItemList from "../ItemList";

//props로 url의 정보를 받는다.
export default async function Category(props: {
  params: { category: string };
}) {
  let db = (await connectDB).db("forum");
  let items = await db
    .collection("post")
    .find({ category: props.params.category })
    .toArray();

  return (
    <div className="h-full">
      <h1 className="h-full">{props.params.category} 페이지</h1>
      <ItemList items={items} />
    </div>
  );
}
