"use client";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";

const PAGES_PER_SKIP = 5;
const PAGES_RANGE = Math.floor(PAGES_PER_SKIP / 2);

export default function Button(props: {
  category?: string;
  count: number;
  currentPage: number;
}) {
  const router = useRouter();

  return (
    <button
      className={`${
        props.count === props.currentPage ? "text-black" : "text-gray-500"
      } text-xl hover:scale-105 active:translate-y-0.5`}
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

export function Prev(props: { category?: string; page: number }) {
  const router = useRouter();

  return (
    <button
      className="text-xl hover:scale-105 active:translate-y-0.5"
      onClick={() => {
        if (props.page - PAGES_RANGE > 0) {
          router.push(
            `/board${props.category ? "/" + props.category : ""}?page=${
              props.page - PAGES_PER_SKIP > 0 ? props.page - PAGES_PER_SKIP : 1
            }`
          );
        }
      }}
    >
      <FontAwesomeIcon icon={faChevronLeft} className="text-sm" />
    </button>
  );
}

export function Next(props: {
  category?: string;
  page: number;
  pageNum: number;
}) {
  const router = useRouter();

  return (
    <button
      className="text-xl hover:scale-105 active:translate-y-0.5"
      onClick={() => {
        if (props.page + PAGES_RANGE <= props.pageNum) {
          router.push(
            `/board${props.category ? "/" + props.category : ""}?page=${
              props.page + PAGES_PER_SKIP < props.pageNum
                ? props.page + PAGES_PER_SKIP
                : props.pageNum
            }`
          );
        }
      }}
    >
      <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
    </button>
  );
}
