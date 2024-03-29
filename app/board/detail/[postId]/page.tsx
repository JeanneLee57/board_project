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
import { faMessage, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { WithId, Document } from "mongodb";
import Heart from "@/components/Heart";
import { redirect } from "next/navigation";
import Comment from "@/components/Comment";

export interface UserInfo extends WithId<Document> {
  _id: ObjectId;
  email: string | null;
  image: string;
  emailVerified: boolean | null;
  likes?: { post: string[]; comment: string[] };
}

export default async function Detail(props: { params: { postId: string } }) {
  let db = (await connectDB).db("forum");
  const item: Item | null = await db
    .collection<Item>("post")
    .findOne({ _id: new ObjectId(props.params.postId) });
  if (!item) return <Error />;

  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/board/notice");
  }
  let testDb = (await connectDB).db("test");
  const userInfo: UserInfo | null = await testDb
    .collection<UserInfo>("users")
    .findOne({ name: session!.user!.name });
  const isLiked =
    userInfo && userInfo.likes
      ? userInfo.likes.post.includes(item._id.toString())
      : false;
  const commentLikes = userInfo && userInfo.likes && userInfo.likes.comment;
  return (
    <main className="mt-10 w-full">
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
        {session && session!.user!.name! === item.author && (
          <div className="my-4">
            <Link href={`/board/edit/${item._id}`} className="mr-2">
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
        <pre className="w-5/6 text-lg leading-relaxed">{item.content}</pre>
      </article>
      {session && (
        <>
          <h4 className="mb-1 bg-neutral-200 p-1 w-5/6">
            <Heart
              isLiked={isLiked}
              type={"post"}
              postId={item._id.toString()}
            />
            게시글 좋아요
          </h4>
          <h4 className="mb-1 p-1">
            <FontAwesomeIcon icon={faMessage} /> 댓글 작성하기
          </h4>
          <form
            action={"/api/post/comment"}
            method="POST"
            className="flex items-center"
          >
            <textarea
              required
              name="content"
              className="border border-gray-400 w-3/4 h-14 rounded-md"
            />
            <input
              name="_id"
              defaultValue={item._id.toString()}
              className="hidden"
            />
            <button
              className="px-2 h-14 ml-4 active:translate-y-0.5 flex items-center justify-center bg-zinc-600 text-neutral-200 rounded-md font-semibold hover:text-white transition-all border"
              type="submit"
            >
              등록
            </button>
          </form>
        </>
      )}
      <h4 className="mt-10">댓글 {item.comment.length}</h4>
      <ul role="list" className="divide-y divide-gray-200 mb-10 w-5/6">
        {item.comment.length ? (
          item.comment.map((comment) => (
            <li className="gap-x-6 py-3" key={comment.id}>
              <Comment
                comment={comment}
                user={session.user!.name as string}
                itemId={item._id.toString()}
              />
              <p className="text-sm">
                <Heart
                  type={"comment"}
                  postId={item._id.toString()}
                  commentId={comment.id}
                  isLiked={
                    commentLikes ? commentLikes.includes(comment.id) : false
                  }
                />
                {comment.likes}
              </p>
            </li>
          ))
        ) : (
          <li>댓글이 없어잉..🥲</li>
        )}
      </ul>
    </main>
  );
}
