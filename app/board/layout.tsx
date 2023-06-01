import Link from "next/link";

export default function BoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-row items w-full h-full">
      <nav className="flex flex-col items-center mr-8 ml-4 mt-16 w-48">
        <Link
          className="text-white mt-2 mb-2 p-4 w-28 hover:-translate-y-1 text-center rounded-lg hover:scale-105 bg-indigo-500"
          href="/board/write"
        >
          글쓰기
        </Link>
        <Link
          className="text-white mt-2 mb-2 p-4 w-28 hover:-translate-y-1 text-center rounded-lg hover:scale-105 bg-teal-500"
          href="/board/frontend"
        >
          프론트엔드
        </Link>
        <Link
          className="text-white mt-2 mb-2 p-4 w-28 hover:-translate-y-1 text-center rounded-lg hover:scale-105 bg-sky-500"
          href="board/backend"
        >
          백엔드
        </Link>
      </nav>
      {children}
      <aside className="w-48 mt-16">나는 광고야</aside>
    </section>
  );
}
