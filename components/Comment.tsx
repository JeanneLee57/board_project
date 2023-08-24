"use client";

import { Comment } from "@/app/board/ItemList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Comment({
  comment,
  user,
  itemId,
}: {
  comment: Comment;
  user: string;
  itemId: string;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleDelete = () => {
    const result = confirm("정말로 삭제하시겠습니까?");
    if (result === true) {
      fetch(`/api/comment/delete/${itemId}/${comment.id}`, {
        method: "DELETE",
      }).then((res) => {
        if (res.status === 200) {
          window.location.href = `${process.env.NEXTAUTH_URL}/board/detail/${itemId}`;
        }
      });
    }
  };
  return isEditing ? (
    <form
      action={"/api/comment/edit"}
      method="POST"
      className="flex item-center"
    >
      <textarea
        name="content"
        defaultValue={comment.content}
        className="border border-gray-500 px-2 py-1 h-12 w-3/4 rounded-md mr-2"
      />
      <input className="hidden" name="postId" defaultValue={itemId} />
      <input className="hidden" name="commentId" defaultValue={comment.id} />
      <button
        type="submit"
        className="p-2 bg-zinc-400 text-white rounded-md text-sm"
      >
        등록
      </button>
    </form>
  ) : (
    <>
      <span className="mr-4 text-sm">{comment.author}</span>
      <span className="text-gray-500 text-sm">{comment.date.slice(0, 10)}</span>
      {user === comment.author && (
        <span className="text-sm text-gray-500">
          <FontAwesomeIcon
            icon={faPencil}
            onClick={handleEdit}
            className="ml-4 mr-2"
          />
          <FontAwesomeIcon icon={faTrash} onClick={handleDelete} />
        </span>
      )}
      <p>{comment.content}</p>
    </>
  );
}
