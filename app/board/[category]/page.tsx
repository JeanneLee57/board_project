import { connectDB } from "@/util/database";
import ItemList from "../ItemList";
import { ITEMS_PER_PAGE } from "../page";
import Button from "@/components/Button";

//props로 url의 정보를 받는다.
export default async function Category(props: {
  params: { category: string };
}) {
  let db = (await connectDB).db("forum");
  const itemCount = await db
    .collection("post")
    .find({ category: props.params.category })
    .count();
  const pageNum = Math.ceil(itemCount / ITEMS_PER_PAGE);
  const divs = [];
  for (let i = 1; i <= pageNum; i++) {
    divs.push(<Button count={i} />);
  }
  let items = await db
    .collection("post")
    .find({ category: props.params.category })
    .toArray();

  return (
    <div className="h-full">
      <h1 className="h-full">{props.params.category} 페이지</h1>
      <ItemList items={items} />
      <div className="flex flex-row gap-4">{divs}</div>
    </div>
  );
}
