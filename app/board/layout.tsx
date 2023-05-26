import Link from "next/link";

export default function BoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-row w-full">
      <nav className="mr-3 w-48">
        <Link href="/board/write">글쓰기</Link>
      </nav>
      {children}
      <aside className="w-48">나는 광고야</aside>
    </section>
  );
}
