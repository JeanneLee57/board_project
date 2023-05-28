import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database";
import { Item } from "../../ItemList";

export default async function Detail(props: { params: { postId: string } }) {
  let db = (await connectDB).db("forum");
  const item: Item = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.postId) });

  if (!item) return <h1>게시물을 찾을 수 없습니다.</h1>;

  return (
    <main className="w-3/4 mt-10">
      {" "}
      <article className="mb-10">
        <p>{item.category}</p>
        <h1>{item.title}</h1>
        <p>{item.content}</p>
      </article>{" "}
      <div>
        {item.comment ? (
          item.comment.map((comment) => (
            <div key={comment.id}>
              <span className="mr-4">{comment.author}</span>
              <span>{comment.date}</span>
              <p>{comment.content}</p>
              <p>좋아요 {comment.likes}</p>
            </div>
          ))
        ) : (
          <div>댓글이 없어잉..</div>
        )}
      </div>
    </main>
  );
}
