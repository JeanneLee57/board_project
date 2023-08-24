"use client";

import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";

export default function Heart(props: {
  type: string;
  postId: string;
  commentId?: string;
  isLiked: boolean;
}) {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        if (props.isLiked) {
          fetch(
            `/api/likes/${props.type}/${
              props.commentId
                ? props.postId + "/" + props.commentId
                : props.postId
            }`,
            {
              method: "DELETE",
            }
          ).then((res) => {
            if (res.status === 200) {
              window.location.href = `${process.env.NEXTAUTH_URL}/board/detail/${props.postId}`;
            }
          });
        } else {
          fetch(
            `/api/likes/${props.type}/${
              props.commentId
                ? props.postId + "/" + props.commentId
                : props.postId
            }`,
            {
              method: "POST",
            }
          ).then((res) => {
            if (res.status === 200) {
              window.location.href = `${process.env.NEXTAUTH_URL}/board/detail/${props.postId}`;
            }
          });
        }
      }}
    >
      <FontAwesomeIcon
        icon={faHeart}
        size="lg"
        className={`${props.isLiked ? "text-rose-500" : "text-gray-500"} mr-1`}
      />
    </button>
  );
}
