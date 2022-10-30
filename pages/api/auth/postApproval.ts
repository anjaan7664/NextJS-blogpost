import connectMongo from "@/utils/connectMongo";
import Blog from "@/models/blog.model";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session || session.user?.role === "user") {
    res.status(401).json({ message: "You are not authorized" });
  } else {
    try {
      await connectMongo();
      const blogId = req.body.id;
      const status = req.body.status;
      const blogPost = await Blog.updateOne(
        { _id: blogId },
        {
          $set: {
            status: status,
          },
        }
      );

      res
        .status(200)
        .json({ message: "Post Status Updated!", metaData: blogPost });
    } catch (error) {
      res.json({ error });
    }
  }
}
