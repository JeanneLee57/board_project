"use client";
import { useRouter } from "next/navigation";
import { ITEMS_PER_PAGE } from "./page";

export default function PageNums(props: { count: number }) {
  const router = useRouter();
  // const pageNum = Math.ceil(props.count / ITEMS_PER_PAGE);
  return <button onClick={() => router.push("/board?page=2")}>2</button>;
}
