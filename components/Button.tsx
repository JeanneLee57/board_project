"use client";
import { useRouter } from "next/navigation";

export default function Button(props: { category?: string; count: number }) {
  const router = useRouter();

  return (
    <button
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
