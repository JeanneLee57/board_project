import { connectDB } from "@/util/database";
import ItemList from "../ItemList";
import { ITEMS_PER_PAGE } from "../page";
import Button from "@/components/Button";
import { EngtoKor } from "@/util/convertCategory";
import { Item } from "../ItemList";

export default async function Category(props: {
  params: { category: string };
  searchParams: { page?: string };
}) {
  let db = (await connectDB).db("forum");
  const itemCount = await db
    .collection<Item>("post")
    .find({ category: props.params.category })
    .count();
  const pageNum = Math.ceil(itemCount / ITEMS_PER_PAGE);
  const divs = [];
  for (let i = 1; i <= pageNum; i++) {
    divs.push(<Button category={props.params.category} count={i} />);
  }
  const page = props.searchParams.page;
  let items = page
    ? await db
        .collection<Item>("post")
        .find({ category: props.params.category })
        .sort({ date: -1 })
        .skip(ITEMS_PER_PAGE * (+page - 1))
        .limit(ITEMS_PER_PAGE)
        .toArray()
    : await db
        .collection<Item>("post")
        .find({ category: props.params.category })
        .sort({ date: -1 })
        .limit(ITEMS_PER_PAGE)
        .toArray();

  return (
    <main className="h-full w-full mt-12 mb-20">
      <h1 className="h-full w-80 border-b border-gray-400 pb-6 mb-4">
        {EngtoKor(props.params.category)}
      </h1>
      <ItemList items={items} />
      <div className="flex flex-row justify-center gap-4">{divs}</div>
    </main>
  );
}
