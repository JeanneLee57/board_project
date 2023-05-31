import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { Item } from "../../ItemList";
import Error from "@/components/Error";
import Form from "@/components/Form";

export default async function Edit(props: { params: { postId: string } }) {
  let db = (await connectDB).db("forum");
  let item: Item | null = await db
    .collection<Item>("post")
    .findOne({ _id: new ObjectId(props.params.postId) });

  if (!item) return <Error />;

  return (
    <main className="h-full w-full mt-12 mb-20">
      <h1 className="h-full w-80 border-b border-gray-400 pb-6 my-5">
        글 수정
      </h1>
      <Form type={"edit"} item={item} />
    </main>
  );
}
