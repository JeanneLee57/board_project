import { ObjectId } from "mongodb";
import ItemCard from "./ItemCard";
import { connectDB } from "@/util/database";
import PageNums from "./PageNums";
import tw from "tailwind-styled-components";
export default async function () {
  //쿼리파라미터 페이지 값을 받으면 해당하는 페이지의 글 목록을 끊어서 표시하도록
  const client = await connectDB;
  const db = client.db("forum");
  const result = await db.collection("post").find().toArray();

  return (
    <article>
      <ul role="list" className="divide-y divide-gray-200">
        {result.map((item) => (
          <li className="flex relative gap-x-6 py-5">
            <div>
              <p>{item.category}</p>
              <h2 className="font-semibold leading-6 mt-3 mb-3 text-gray-900">
                {item.title}
              </h2>
              <p className="mt-3 mb-4 text-ellipsis leading-5 text-gray-500">
                {item.content.substring(0, 200)}
              </p>
              <div>
                <span className="mr-3">좋아요 {item.likes}</span>
                <span>댓글 {item.comment.length}</span>
              </div>
            </div>
            <div className="mt-3 mb-3 bottom-0 flex flex-col justify-between">
              <p></p>
              <div>
                <p className="text-right  mr-3 mb-1">{item.author}</p>
                <p className="text-gray-500 text-right mr-3">{item.date}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <PageNums />
    </article>
  );
}
