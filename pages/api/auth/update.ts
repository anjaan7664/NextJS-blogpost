import connectMongo from "@/utils/connectMongo";
import User from "@/models/user.model";
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
    const userId =  req.query.userId;
    const userEmail = req.query.email;
    const userName = req.query.name;

    const blogPost = await User.updateOne(
      { _id: userId },
      {
        $set: {
         email: userEmail,
         name: userName
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
    res.status(200).json({ message: "User updated!", metaData: blogPost });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
