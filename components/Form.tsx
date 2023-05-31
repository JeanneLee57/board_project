import { Item } from "@/app/board/ItemList";

export default function Form({ type, item }: { type: string; item?: Item }) {
  return (
    <form
      action={type === "write" ? "/api/post/new" : "/api/post/edit"}
      method="POST"
      className="flex flex-col h-full"
    >
      <div className="flex justify-between">
        <input
          className="w-120 h-10 rounded-md p-2 border-gray-400 border"
          required
          name="title"
          placeholder={type === "write" ? "제목을 입력하세요" : undefined}
          defaultValue={type === "write" ? undefined : item!.title}
        />
        <select
          name="category"
          className="h-10 w-32 p-2 border border-gray-400 ml-4 rounded-md"
        >
          <option
            value="frontend"
            selected={item?.category === "frontend" ? true : false}
          >
            프론트엔드
          </option>
          <option
            value="backend"
            selected={item?.category === "backend" ? true : false}
          >
            백엔드
          </option>
        </select>
      </div>
      <textarea
        className="border border-gray-400 py-6 px-4 mt-6 rounded-md h-96"
        required
        name="content"
        defaultValue={type === "write" ? undefined : item!.content}
      />
      {type === "edit" && (
        <input
          className="hidden"
          name="_id"
          defaultValue={item!._id.toString()}
        />
      )}
      <button
        className="place-self-end mt-4 active:translate-y-0.5 flex items-center justify-center bg-zinc-600 w-28 text-neutral-200 px-2 py-3 rounded-md font-semibold hover:text-white transition-all border"
        type="submit"
      >
        완료!
      </button>
    </form>
  );
}
