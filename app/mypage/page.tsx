import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

//로그인 페이지를 만들어서 그쪽으로 리다이렉팅할지, 에러 메시지를 띄운 뒤 n초 뒤 메인으로 이동하게 할지 결정
export default async function Mypage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }
  return <h1>마이 페이지</h1>;
}
