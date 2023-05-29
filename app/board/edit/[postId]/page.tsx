import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { Item } from "../../ItemList";

export default async function Edit(props: { params: { postId: string } }) {
  let db = (await connectDB).db("forum");
  let result: Item = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.postId) });

  return (
    <main>
      <h1>글 수정</h1>
      <form action="/api/post/edit" method="POST">
        <input required name="title" defaultValue={result.title} />
        <select name="category">
          {result.category === "frontend" ? (
            <>
              {" "}
              <option selected={true}>프론트엔드</option>
              <option>백엔드</option>{" "}
            </>
          ) : (
            <>
              {" "}
              <option>프론트엔드</option>
              <option selected={true}>백엔드</option>
            </>
          )}
        </select>
        <input required name="content" defaultValue={result.content} />
        <input
          className="hidden"
          name="_id"
          defaultValue={result._id.toString()}
        />
        <button type="submit">전송</button>
      </form>
    </main>
  );
}
