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
    const queryPerPage = parseInt(req.query.perPage as string);
    const queryPage = parseInt(req.query.page as string);
    const id = req.query.id;
    const result = await Blog.paginate({"authorId": id},
      {
        page: queryPage,
        limit: queryPerPage
      }
    );

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
