import NextAuth from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";

function getEnvVar(v: string): string {
  const ret = process.env[v];
  if (ret === undefined) {
    throw new Error("process.env." + v + " is undefined!");
  }
  return ret;
}

export const authOptions = {
  providers: [
    KakaoProvider({
      clientId: getEnvVar("KAKAO_ID"),
      clientSecret: getEnvVar("KAKAO_SECRET"),
    }),
  ],
  secret: getEnvVar("JWT_SECRET"),
};
export default NextAuth(authOptions);
