import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database";
import { Item } from "../../ItemList";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Error from "@/components/Error";
import DeleteBtn from "@/components/DeleteBtn";
import { EngtoKor } from "@/util/convertCategory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

export default async function Detail(props: { params: { postId: string } }) {
  let db = (await connectDB).db("forum");
  const item: Item | null = await db
    .collection<Item>("post")
    .findOne({ _id: new ObjectId(props.params.postId) });

  if (!item) return <Error />;
  const session = await getServerSession(authOptions);

  return (
    <main className="mt-10">
      <article className="mb-10">
        <span
          className={`${
            item.category === "frontend" ? "bg-teal-500" : "bg-sky-500"
          } text-white px-2 py-1 rounded-md`}
        >
          {EngtoKor(item.category)}
        </span>
        <h1 className="mt-2">{item.title}</h1>
        <div className="h-full w-5/6 border-b border-gray-400 pb-4 mt-2 mb-4">
          <span>{item.author}</span>
          <span className="mx-2">|</span>
          <span>{item.date.slice(0, 10)}</span>
        </div>
        {session!.user!.name! === item.author && (
          <div className="my-4">
            <Link href={`/board/edit/${item._id}`} className="mr-4">
              <FontAwesomeIcon
                icon={faPenToSquare}
                size="lg"
                className="text-blue-900"
              />
              수정
            </Link>
            <DeleteBtn postId={item._id.toString()} />
          </div>
        )}
        <p className="w-5/6 text-lg leading-relaxed">{item.content}</p>
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
