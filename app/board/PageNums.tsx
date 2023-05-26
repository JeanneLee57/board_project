"use client";
import { useRouter } from "next/navigation";

export default function PageNums() {
  const router = useRouter();
  return <button onClick={() => router.push("/board?page=2")}>2</button>;
}
