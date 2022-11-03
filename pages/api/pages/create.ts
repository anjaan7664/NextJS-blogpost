import connectMongo from "@/utils/connectMongo";
import Pages from "@/models/pages.model";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (session) {
    res.status(401).json({ message: "You are not authorized" });
  } else {
    try {
      await connectMongo();
      const pageTitle = req.query.title as string;
      const pageDescription = req.query.description;
      const pageLinkName = req.query.link_name;

      const pageData = new Pages({
        link_name: pageLinkName,
        title: pageTitle,
        description: pageDescription,
        image:''
      });
      await pageData.save();
      res.status(200).json({ message: "Page created!", blogData: pageData });
    } catch (error) {
      res.json({ error });
    }
  }
}
