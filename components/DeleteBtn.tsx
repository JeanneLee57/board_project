"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";

export default function DeleteBtn(props: { postId: string }) {
  return (
    <button
      onClick={() => {
        const result = confirm("정말로 삭제하시겠습니까?");
        if (result === true) {
          fetch(`/api/delete/${props.postId}`, { method: "DELETE" }).then(
            (res) => {
              if (res.status === 200) {
                /* useRouter의 router.push()로 refresh가 되지 않음 */
                window.location.href = `http://${process.env.NEXTAUTH_URL}/board`;
              }
            }
          );
        }
      }}
    >
      <FontAwesomeIcon icon={faTrash} size="lg" className="text-blue-900" />
      삭제
    </button>
  );
}
