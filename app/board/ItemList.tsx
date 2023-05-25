import { ObjectId } from "mongodb";
import ItemCard from "./ItemCard";
import { connectDB } from "@/util/database";

export default async function () {
  const client = await connectDB;
  const db = client.db("forum");
  let result = await db.collection("post").find().toArray();

  return (
    <ul>
      {result.map((item) => (
        <li>
          <span>{item.category}</span>
          <div className="flex">
            <h2>{item.title}</h2>
            <span>{item.likes}</span>
            <span>{item.comment.length}</span>
          </div>
          <div>{item.content.substring(0, 120)}</div>
          <span>{item.date}</span>
        </li>
      ))}
    </ul>
  );
}
