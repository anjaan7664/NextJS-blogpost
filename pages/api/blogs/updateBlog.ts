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
      const blogId = req.query.blogId;
      const blogTitle = req.query.title;
      const blogBody = req.query.body;

      const blogPost = await Blog.updateOne(
        { _id: blogId },
        {
          $set: {
            title: blogTitle,
            body: blogBody,
          },
        }
      );
      res.status(200).json({ message: "Blog update!", metaData: blogPost });
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  }
}
