import connectMongo from "lib/utils/connectMongo";
import Blog from "lib/models/blog.model";
import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectMongo();
    const queryPerPage = parseInt(req.query.perPage as string);
    const queryPage = parseInt(req.query.page as string);
    const authorId = req.query.id as string;
    const result = await Blog.paginate(
      {authorId: authorId},
      {
        page: queryPage,
        sort: { createdAt: -1 },
        limit: queryPerPage,
      }
    );

    res.status(200).json(result);
  } catch (error) {
    res.json({ error });
  }
}
