import connectMongo from "lib/utils/connectMongo";
import Pages from "lib/models/pages.model"
import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectMongo();
    const linkName = req.query.link_name;
    const singlePage = await Pages.findOne({ "link_name": linkName });
    res.json(singlePage);
    res.end();
  } catch (error) {
    res.json({ error });
    res.end();
  }
}
