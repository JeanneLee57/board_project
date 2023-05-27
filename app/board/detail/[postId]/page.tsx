import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database.js";

interface Item {
  _id: ObjectId;
  title: string;
  content: string;
  author: string;
  likes: string;
  comment:
    | {
        id: number;
        content: string;
        author: string;
        likes: string;
        date: string;
      }[]
    | null;
  category: string;
  date: string;
}

//props로 url의 정보를 받는다.
export default async function Detail(props) {
  const client = await connectDB;
  const db = client.db("forum");
  const item: Item = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.postId) });

  return (
    <article>
      <h1>{item.title}</h1>
      <p>{item.category}</p>
      <p>{item.content}</p>
      <p>
        {item.comment ? (
          item.comment.map((comment) => <div>{comment.author}</div>)
        ) : (
          <div>댓글이 없어잉..</div>
        )}
      </p>
    </article>
  );
}
