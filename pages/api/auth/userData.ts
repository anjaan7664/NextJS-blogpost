import connectMongo from "@/utils/connectMongo";
import User from "@/models/user.model";

import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ message: "You are not authorized" });
  } else {
    try {
      await connectMongo();
      const userId = req.query.userId;
      const userInfo = await User.findOne({ id: userId });
      console.log(userInfo);
      res.json(userInfo);
      res.end();
    } catch (error) {
      console.log(error);
      res.json({ error });
      res.end();
    }
  }
}
