import connectMongo from "@/utils/connectMongo";
import Blog from "@/models/blog.model";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ message: "You are not authorized" });
  } else {
    try {
      await connectMongo();
      const blogId = req.body.blogId;
      const data = await Blog.deleteOne({ _id: blogId });
      res.status(200).json({ message: "Blog deleted!", metaData: data });
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  }
}
