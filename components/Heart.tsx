"use client";

import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";

export default function Heart(props: {
  type: string;
  postId: string;
  isLiked: boolean;
}) {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        if (props.isLiked) {
          fetch(`/api/likes/${props.postId}`, {
            method: "DELETE",
            body: props.type,
          }).then((res) => {
            if (res.status === 200) {
              window.location.href = `http://localhost:3000/board/detail/${props.postId}`;
            }
          });
        } else {
          fetch(`/api/likes/${props.postId}`, {
            method: "POST",
            body: props.type,
          }).then((res) => {
            if (res.status === 200) {
              window.location.href = `http://localhost:3000/board/detail/${props.postId}`;
            }
          });
        }
      }}
    >
      <FontAwesomeIcon
        icon={faHeart}
        size="lg"
        className={`${props.isLiked ? "text-rose-500" : "text-gray-500"}`}
      />
    </button>
  );
}
