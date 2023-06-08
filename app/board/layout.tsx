import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function BoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <section className="flex flex-row items w-full h-full">
      <nav className="flex flex-col items-center mr-8 ml-4 mt-16 w-48">
        {session && (
          <Link
            className="text-white mt-2 mb-2 p-4 w-28 hover:-translate-y-1 text-center rounded-lg hover:scale-105 bg-amber-500"
            href="/board/write"
          >
            글쓰기
          </Link>
        )}

        <Link
          className="text-white mt-2 mb-2 p-4 w-28 hover:-translate-y-1 text-center rounded-lg hover:scale-105 bg-indigo-500"
          href="/board"
        >
          전체 글
        </Link>
        <Link
          className="text-white mt-2 mb-2 p-4 w-28 hover:-translate-y-1 text-center rounded-lg hover:scale-105 bg-teal-500"
          href="/board/frontend"
        >
          프론트엔드
        </Link>
        <Link
          className="text-white mt-2 mb-2 p-4 w-28 hover:-translate-y-1 text-center rounded-lg hover:scale-105 bg-sky-500"
          href="/board/backend"
        >
          백엔드
        </Link>
        {session && (
          <Link
            className="text-white mt-2 mb-2 p-4 w-28 hover:-translate-y-1 text-center rounded-lg hover:scale-105 bg-rose-500"
            href="/board/likes"
          >
            좋아요한 글
          </Link>
        )}
      </nav>
      {children}
      <aside className="w-48 mt-16">나는 광고야</aside>
    </section>
  );
}
