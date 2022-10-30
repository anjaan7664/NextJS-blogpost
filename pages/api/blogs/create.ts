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
      const blogTitle = req.query.title as string;
      const blogDescription = req.query.description;
      const authorId = req.query.authorId;
      const blogBody = req.query.body;
      let slug = blogTitle.replaceAll(" ", "-");
      const existingSlug = await Blog.findOne({ slug: slug });
      if (existingSlug) {
        // Adding a number so 2 blog can have the same slug
        // We can add a new method here to handle multiple slug with same name
        slug = slug + "-" + "1";
      }
      const blogPost = new Blog({
        title: blogTitle,
        description: blogDescription,
        body: blogBody,
        slug,
        authorId,
      });
      await blogPost.save();
      res.status(200).json({ message: "Blog created!", blogData: blogPost });
    } catch (error) {
      res.json({ error });
    }
  }
}
