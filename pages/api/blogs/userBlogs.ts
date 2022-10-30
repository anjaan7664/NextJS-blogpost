import connectMongo from "@/utils/connectMongo";
import Blog from "@/models/blog.model";
import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectMongo();
    const queryPerPage = parseInt(req.query.perPage as string);
    const queryPage = parseInt(req.query.page as string);
    const id = req.query.id;
    const result = await Blog.paginate(
      { authorId: id },
      {
        page: queryPage,
        limit: queryPerPage,
      }
    );

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
