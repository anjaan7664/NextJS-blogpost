import connectMongo from "@/utils/connectMongo";
import Blog from "@/models/blog.model";
import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";

const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);
  try {
    await connectMongo();
    const blogId =  req.query.blogId;
    const blogTitle = req.query.title;
    const blogDescription = req.query.description;
    const blogBody = req.query.body;

    const blogPost = await Blog.updateOne(
      { _id: blogId },
      {
        $set: {
          title: blogTitle,
          description: blogDescription,
          body: blogBody,
        },
      }
    );
    // const blogPost = new Blog({
    //   title: blogTitle,
    //   description: blogDescription,
    //   authorName,
    //   authorEmail,
    // });
    // await blogPost.save();
    res.status(200).json({ message: "Blog update!", metaData: blogPost });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
