import connectMongo from "@/utils/connectMongo";
import Blog from "@/models/blog.model";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectMongo();
    const articleSlug = req.query.slug;
    console.log(articleSlug);
    const singleBlog = await Blog.findOne({ "slug": articleSlug });
    res.json(singleBlog);
    res.end();
  } catch (error) {
    console.log(error);
    res.json({ error });
    res.end();
  }
}
