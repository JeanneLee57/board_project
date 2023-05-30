import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database";
import { Item } from "../../ItemList";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Error from "@/components/Error";

export default async function Detail(props: { params: { postId: string } }) {
  let db = (await connectDB).db("forum");
  const item: Item | null = await db
    .collection<Item>("post")
    .findOne({ _id: new ObjectId(props.params.postId) });

  if (!item) return <Error />;
  const session = await getServerSession(authOptions);

  return (
    <main className="w-3/4 mt-10">
      {" "}
      <article className="mb-10">
        <p>{item.category}</p>
        <h1>{item.title}</h1>
        <p>{item.content}</p>
        {session!.user!.name! === item.author && (
          <Link href={`/board/edit/${item._id}`}>✏️</Link>
        )}
      </article>
      <div className="mb-10">
        {item.comment.length ? (
          item.comment.map((comment) => (
            <div key={comment.id}>
              <span className="mr-4">{comment.author}</span>
              <span>{comment.date}</span>
              <p>{comment.content}</p>
              <p>좋아요 {comment.likes}</p>
            </div>
          ))
        ) : (
          <div>댓글이 없어잉..🥲</div>
        )}
      </div>
    </main>
  );
}
