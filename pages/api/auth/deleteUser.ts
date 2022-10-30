import connectMongo from "@/utils/connectMongo";
import Blog from "@/models/blog.model";
import User from "@/models/user.model";
import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";

const cors = Cors({
  methods: ["POST", "GET", "HEAD", "DELETE"],
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
    const userId = req.query.userId;
    const data = await User.deleteOne({ _id: userId });
    res.status(200).json({ message: "User deleted!", metaData: data });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
