"use client";

import { useRouter } from "next/navigation";

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
      🗑️
    </button>
  );
}
