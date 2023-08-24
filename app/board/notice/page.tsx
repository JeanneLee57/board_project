"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Notice() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(5);
  useEffect(() => {
    if (seconds <= 0) {
      router.push("/");
    } else {
      const timer = setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [router, seconds]);

  return (
    <p className="w-full text-center mt-12">
      <h1>게시글 조회를 위해서는 로그인해주세요.</h1>
      <h2>{seconds}초 뒤 홈으로 이동합니다.</h2>
      <a className="underline" href="/">
        홈으로 가기
      </a>
    </p>
  );
}
