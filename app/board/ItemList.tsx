import { ObjectId } from "mongodb";
import Link from "next/link";

interface ItemProps {
  items: {
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
  }[];
}

const ItemList: React.FC<ItemProps> = (props) => {
  const itemsCount = props.items.length;
  return (
    <article>
      <ul role="list" className="divide-y divide-gray-200">
        {props.items.map((item) => (
          <li id={item._id} className="flex relative gap-x-6 py-5">
            <div>
              <p>{item.category}</p>
              <Link href={`/board/detail/${item._id}`}>
                <h2 className="font-semibold leading-6 mt-3 mb-3 text-gray-900">
                  {item.title}
                </h2>
              </Link>
              <p className="mt-3 mb-4 text-ellipsis leading-5 text-gray-500">
                {item.content.substring(0, 200)}
              </p>
              <div>
                <span className="mr-3">좋아요 {item.likes}</span>
                <span>댓글 {item.comment ? item.comment.length : "0"}</span>
              </div>
            </div>
            <div className="mt-3 mb-3 bottom-0 flex flex-col justify-between">
              <p>{item.author}</p>
              <div>
                <p className="text-right  mr-3 mb-1"></p>
                <p className="text-gray-500 text-right mr-3 w-24">
                  {item.date}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default ItemList;
