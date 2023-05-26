import ItemList from "./ItemList";

export default function Board() {
  return (
    <div className="h-full">
      <h1 className="h-full">게시글 페이지</h1>
      {/* @ts-expect-error Async Server Component */}
      <ItemList />
    </div>
  );
}
