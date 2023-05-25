import Link from "next/link";
import { SignIn, SignOut } from "./actions";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function Header() {
  const sessionRes = await getServerSession(authOptions);

  return (
    <header className="flex h-20 items-center justify-between bg-gradient-to-r from-sky-500 to-indigo-500 px-4 drop-shadow-md md:px-20">
      <span className="flex w-1/3 justify-between md:w-1/6">
        <Link className="hover:text-white active:translate-y-0.5" href="/">
          로고
        </Link>{" "}
        <Link className="hover:text-white active:translate-y-0.5" href="/about">
          about
        </Link>
        <Link className="hover:text-white active:translate-y-0.5" href="/board">
          게시판
        </Link>
      </span>
      <span>{sessionRes ? <SignOut /> : <SignIn />}</span>
    </header>
  );
}
