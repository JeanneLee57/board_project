"use client";
import { useRouter } from "next/navigation";

export default function Button(props: { category?: string; count: number }) {
  const router = useRouter();

  return (
    <button
      className="text-xl hover:scale-105 active:translate-y-0.5"
      onClick={() =>
        router.push(
          `/board${props.category ? "/" + props.category : ""}?page=${
            props.count
          }`
        )
      }
    >
      {props.count}
    </button>
  );
}
