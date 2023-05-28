import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Comment } from "@/app/board/ItemList";
import { NextApiRequest, NextApiResponse } from "next";
import { Item } from "@/app/board/ItemList";
import { KortoEng } from "@/util/convertCategory";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    author: string;
    likes: string;
    comment: Comment[];
    date: string;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sessionRes = await getServerSession(req, res, authOptions);
  const currentDate = new Date();
  var tzoffset = new Date().getTimezoneOffset() * 60000;
  var localISOTime = new Date(Date.now() - tzoffset).toISOString().slice(0, -1);
  //const currentDateToString = currentDate.toISOString();
  const updatedData: Item = req.body;
  updatedData.category = KortoEng(req.body.category);
  updatedData.author = sessionRes!.user!.name!;
  updatedData.likes = "0";
  updatedData.comment = [];
  updatedData.date = localISOTime;

  if (req.method == "POST") {
    const db = (await connectDB).db("forum");
    let result = await db.collection("post").insertOne(updatedData);
    res.redirect(302, "/board");
  }
}
