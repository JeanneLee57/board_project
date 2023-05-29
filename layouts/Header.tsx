import Link from "next/link";
import { SignIn, SignOut } from "./actions";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import tw from "tailwind-styled-components";
import Image from "next/image";

export default async function Header() {
  const sessionRes = await getServerSession(authOptions);

  const TwHeader = tw.header`
  flex h-20 items-center justify-between bg-gradient-to-r from-sky-500 to-indigo-500 px-3 drop-shadow-md md:px-20
  `;
  const TwLink = tw(Link)`
  hover:text-white active:translate-y-0.5
`;

  return (
    <TwHeader>
      <span className="flex w-1/3 justify-between md:w-1/6">
        <TwLink href="/">로고</TwLink> <TwLink href="/about">about</TwLink>
        <TwLink href="/board">게시판</TwLink>
      </span>
      <span>
        {sessionRes ? (
          <span className="flex">
            <p className="flex items-center mr-3 text-white">
              <span className="font-bold mr-0.5">{sessionRes.user!.name!}</span>
              님 안녕하세요!
            </p>{" "}
            <Link href="/mypage">
              <Image
                className="rounded-full mr-3"
                src={sessionRes.user!.image!}
                alt="유저 프로필"
                width={50}
                height={50}
              />
            </Link>
            <SignOut />
          </span>
        ) : (
          <SignIn />
        )}
      </span>
    </TwHeader>
  );
}
