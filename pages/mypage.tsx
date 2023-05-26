// import { authOptions } from "./api/auth/[...nextauth]";
// import { getServerSession } from "next-auth/next";
// import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';

// type User = {
//   name: string;
//   email?: string;
//   image: string;
// }

// export const getServerSideProps: GetServerSideProps<{
//   user: User;
// }> = async () => {
//   const session = await getServerSession(user.req, user.res, authOptions);

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {
//       session,
//     },
//   };
// }

// export default async function Mypage() {
//   return <h1>내 정보 페이지</h1>;
// }
