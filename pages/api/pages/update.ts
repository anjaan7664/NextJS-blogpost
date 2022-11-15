import connectMongo from "lib/utils/connectMongo";
import Pages from "lib/models/pages.model";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const session = await getSession({ req });
  try {
    await connectMongo();
    const linkName = req.query.link_name;
    const pageTitle = req.query.title;
    const pageDesc = req.query.description;

    const pageData = await Pages.updateOne(
      { link_name: linkName },
      {
        $set: {
          title:pageTitle,
          description:pageDesc
        },
      }
    );
    res.status(200).json({ message: "Page updated!", metaData: pageData });
  } catch (error) {
    res.json({ error });
  }
}
