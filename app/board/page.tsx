import ItemList from "./ItemList";

export default function Board() {
  return (
    <div className="h-full">
      <h2 className="h-full">게시글 페이지</h2>
      {/* @ts-expect-error Async Server Component */}
      <ItemList />
    </div>
  );
}
