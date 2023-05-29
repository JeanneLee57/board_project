import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Comment } from "@/app/board/ItemList";
import { NextApiRequest, NextApiResponse } from "next";
import { Item } from "@/app/board/ItemList";
import { KortoEng } from "@/util/convertCategory";

type KeysToAdd = Pick<
  Item,
  "category" | "author" | "date" | "likes" | "comment"
>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sessionRes = await getServerSession(req, res, authOptions);
  const tzoffset = new Date().getTimezoneOffset() * 60000;
  const localISOTime = new Date(Date.now() - tzoffset)
    .toISOString()
    .slice(0, -1);

  const keysToAdd: KeysToAdd = {
    category: KortoEng(req.body.category),
    author: sessionRes!.user!.name!,
    likes: "0",
    comment: [],
    date: localISOTime,
  };
  const updatedData: Item = { ...req.body, ...keysToAdd };

  if (req.method == "POST") {
    const db = (await connectDB).db("forum");
    let result = await db.collection("post").insertOne(updatedData);
    res.redirect(302, "/board");
  }
}
