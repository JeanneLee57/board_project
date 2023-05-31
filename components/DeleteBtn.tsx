"use client";

import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function DeleteBtn(props: { postId: string }) {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        const result = confirm("정말로 삭제하시겠습니까?");
        if (result === true) {
          fetch(`/api/delete/${props.postId}`, { method: "DELETE" }).then(
            (res) => {
              if (res.status === 200) {
                /* useRouter의 router.push()로 refresh가 되지 않음 */
                window.location.href = "http://localhost:3000/board";
              }
            }
          );
        }
      }}
    >
      <FontAwesomeIcon icon={faTrash} size="lg" className="text-blue-900" />{" "}
      삭제
    </button>
  );
}
