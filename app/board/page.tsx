import ItemList from "./ItemList";
import Button from "@/components/Button";
import { connectDB } from "@/util/database";
import { Item } from "./ItemList";
import { Prev, Next } from "@/components/Button";

export const ITEMS_PER_PAGE = 10;
export const PAGES_PER_SKIP = 5;
export const PAGES_RANGE = Math.floor(PAGES_PER_SKIP / 2);

export default async function Board(props: {
  searchParams: { page?: string };
}) {
  const client = await connectDB;
  const db = client.db("forum");
  const itemCount = await db.collection("post").countDocuments();
  const pageNum = Math.ceil(itemCount / ITEMS_PER_PAGE);
  const currentPage = props.searchParams.page ? +props.searchParams.page : 1;
  const startPage = Math.max(currentPage - PAGES_RANGE, 1);
  const baseEndPage =
    currentPage < 1 + PAGES_RANGE ? PAGES_PER_SKIP : currentPage + PAGES_RANGE;
  const endPage = Math.min(baseEndPage, pageNum);
  const divs = [];
  for (let i = startPage; i <= endPage; i++) {
    divs.push(<Button count={i} currentPage={currentPage} />);
  }

  const items = currentPage
    ? await db
        .collection<Item>("post")
        .find()
        .sort({ date: -1 })
        .skip(ITEMS_PER_PAGE * (currentPage - 1))
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
      <div className="flex flex-row justify-center items-center gap-x-8 mt-16">
        {startPage > 1 && <Prev page={currentPage} />}
        {divs}
        {endPage < pageNum && <Next page={currentPage} pageNum={pageNum} />}
      </div>
    </main>
  );
}
