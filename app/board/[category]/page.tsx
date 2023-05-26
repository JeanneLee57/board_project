import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database";

//props로 url의 정보를 받는다.
export default async function Category(props: {
  params: { category: string };
}) {
  console.log(props);
  let db = (await connectDB).db("forum");
  let result = await db
    .collection("post")
    .find({ category: props.params.category })
    .toArray();

  console.log(result);

  return <h1>{props.params.category} 페이지</h1>;
}
