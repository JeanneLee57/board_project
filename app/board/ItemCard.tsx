export default function ItemCard() {
  return (
    <div className="border-2 border-solid border-indigo-600">
      <div className="flex">
        <h2>제목</h2>
        <span>댓글 수</span>
        <span>좋아요 수</span>
      </div>
      <div>글 내용</div>
    </div>
  );
}
