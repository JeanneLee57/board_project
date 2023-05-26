"use client";
import { useRouter } from "next/navigation";
import { ITEMS_PER_PAGE } from "@/app/board/page";

export default function Button(props: { count: number }) {
  const router = useRouter();
  return (
    <button onClick={() => router.push(`/board?page=${props.count}`)}>
      {props.count}
    </button>
  );
}
