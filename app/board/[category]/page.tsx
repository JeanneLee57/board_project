import { connectDB } from "@/util/database";
import ItemList from "../ItemList";
import { ITEMS_PER_PAGE, PAGES_PER_SKIP, PAGES_RANGE } from "../page";
import Button from "@/components/Button";
import { EngtoKor } from "@/util/convertCategory";
import { Item } from "../ItemList";
import { Next, Prev } from "@/components/Button";

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
  const currentPage = props.searchParams.page ? +props.searchParams.page : 1;
  const startPage = Math.max(currentPage - PAGES_RANGE, 1);
  const baseEndPage =
    currentPage < 1 + PAGES_RANGE ? PAGES_PER_SKIP : currentPage + PAGES_RANGE;
  const endPage = Math.min(baseEndPage, pageNum);
  const divs = [];
  for (let i = startPage; i <= endPage; i++) {
    divs.push(
      <Button
        category={props.params.category}
        count={i}
        currentPage={currentPage}
      />
    );
  }

  let items = currentPage
    ? await db
        .collection<Item>("post")
        .find({ category: props.params.category })
        .sort({ date: -1 })
        .skip(ITEMS_PER_PAGE * (currentPage - 1))
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
      <div className="flex flex-row justify-center items-center gap-x-8 mt-16">
        {startPage > 1 && (
          <Prev category={props.params.category} page={currentPage} />
        )}
        {divs}
        {endPage < pageNum && (
          <Next
            category={props.params.category}
            page={currentPage}
            pageNum={pageNum}
          />
        )}
      </div>
    </main>
  );
}
