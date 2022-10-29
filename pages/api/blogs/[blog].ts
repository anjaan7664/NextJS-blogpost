import connectMongo from "@/utils/connectMongo";
import Blog from "@/models/blog.model";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectMongo();
    const blogId = req.query.blog;
    const singleBlog = await Blog.findOne({ "id": blogId });
    console.log(singleBlog);
    res.json(singleBlog);
    res.end();
  } catch (error) {
    console.log(error);
    res.json({ error });
    res.end();
  }
}
