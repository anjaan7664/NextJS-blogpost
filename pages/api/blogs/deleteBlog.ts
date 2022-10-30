import connectMongo from "@/utils/connectMongo";
import Blog from "@/models/blog.model";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
