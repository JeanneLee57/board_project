"use client";

import { signIn, signOut } from "next-auth/react";
import loginImg from "../public/kakao_login_medium.png";
import Image from "next/image";

export function SignOut() {
  return (
    <button
      className="flex bg-black text-neutral-200 px-4 py-3 rounded-md font-semibold text-sm hover:text-white transition-all border border-gray-800"
      onClick={() => signOut()}
    >
      로그아웃
    </button>
  );
}

export function SignIn() {
  return (
    <Image
      src={loginImg}
      alt="카카오 로그인"
      onClick={() => {
        signIn();
      }}
    />
  );
}
