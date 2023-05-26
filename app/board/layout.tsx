import Link from "next/link";

export default function BoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-row w-full">
      <nav className="flex flex-col mr-3 mt-6 pl-4 w-48">
        <Link href="/board/write">글쓰기</Link>
        <Link href="/board/frontend">프론트엔드</Link>
        <Link href="board/backend">백엔드</Link>
      </nav>
      {children}
      <aside className="w-48">나는 광고야</aside>
    </section>
  );
}
