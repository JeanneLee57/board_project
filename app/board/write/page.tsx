import Input from "@/components/Input";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import Form from "@/components/Form";

//글 전송 보낼 때 각 필드가 잘 채워졌는지 확인
export default async function Write() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  return (
    <main className="h-full w-full mt-12 mb-20">
      <h1 className="h-full w-80 border-b border-gray-400 pb-6 my-5">
        글 작성
      </h1>
      <Form type={"write"} />
    </main>
  );
}
