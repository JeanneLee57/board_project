import Link from "next/link";

const Header = () => {
  return (
    <header className="flex h-20 items-center justify-between bg-gradient-to-r from-sky-500 to-indigo-500 px-4 drop-shadow-md md:px-20">
      <span className="flex w-1/3 justify-between md:w-1/6">
        <Link href="/">로고</Link> <Link href="/about">about</Link>
      </span>
      <span>
        <Link href="/login">로그인</Link>
      </span>
    </header>
  );
};

export default Header;
