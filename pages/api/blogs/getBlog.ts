import connectMongo from "@/utils/connectMongo";
import Blog from "@/models/blog.model";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectMongo();
    const blogSlug = req.query.slug;
    const singleBlog = await Blog.findOne({ "slug": blogSlug });
    res.json(singleBlog);
    res.end();
  } catch (error) {
    res.json({ error });
    res.end();
  }
}
