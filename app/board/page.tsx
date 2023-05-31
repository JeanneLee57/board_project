import ItemList from "./ItemList";
import Button from "@/components/Button";
import { connectDB } from "@/util/database";
import { Item } from "./ItemList";

export const ITEMS_PER_PAGE = 10;

export default async function Board(props: {
  searchParams: { page?: string };
}) {
  const page = props.searchParams.page;
  const client = await connectDB;
  const db = client.db("forum");
  const itemCount = await db.collection("post").countDocuments();
  const pageNum = Math.ceil(itemCount / ITEMS_PER_PAGE);
  const divs = [];
  for (let i = 1; i <= pageNum; i++) {
    divs.push(<Button count={i} />);
  }

  const items = page
    ? await db
        .collection<Item>("post")
        .find()
        .sort({ date: -1 })
        .skip(ITEMS_PER_PAGE * (+page - 1))
        .limit(ITEMS_PER_PAGE)
        .toArray()
    : await db
        .collection<Item>("post")
        .find()
        .sort({ date: -1 })
        .limit(ITEMS_PER_PAGE)
        .toArray();

  return (
    <main className="h-full w-full mt-12 mb-20">
      <h1 className="h-full w-80 border-b border-gray-400 pb-6 mb-4">
        전체 글
      </h1>
      <ItemList items={items} />
      <div className="flex flex-row justify-center gap-x-8">{divs}</div>
    </main>
  );
}
