import { ObjectId } from "mongodb";

export interface Item {
  _id: ObjectId;
  title: string;
  content: string;
  author: string;
  likes: string;
  comment: {
    id: number;
    content: string;
    author: string;
    likes: string;
    date: string;
  }[];
  category: string;
  date: string;
}

const ItemCard: React.FC<Item> = (props) => {
  const commentLen = props.comment ? props.comment.length : "0";
  return (
    <li className="border-2 border-solid border-indigo-600">
      <span>{props.category}</span>
      <div className="flex">
        <h2>{props.title}</h2>
        <span>{props.author}</span>
        <span>{commentLen}</span>
        <span>{props.likes}</span>
      </div>
      <div>{props.content}</div>
      <span>{props.date}</span>
    </li>
  );
};

export default ItemCard;
