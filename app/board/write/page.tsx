import Input from "@/components/Input";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

//글 전송 보낼 때 각 필드가 잘 채워졌는지 확인
//로그인 상태 확인해서
export default async function Write() {
  const sessionRes = await getServerSession(authOptions);
  return (
    <main>
      <h1>글 쓰기</h1>
      <form action="/api/post/new" method="POST">
        <input name="title" placeholder="글제목" />
        <select name="category">
          <option>프론트엔드</option>
          <option>백엔드</option>
        </select>
        <input name="content" placeholder="글내용" />
        <button type="submit">전송</button>
      </form>
    </main>
  );
}
