import connectMongo from "@/utils/connectMongo";
import User from "@/models/user.model";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectMongo();
    const userId = req.query.userId;
    const userInfo = await User.findOne({ "id": userId });
    console.log(userInfo);
    res.json(userInfo);
    res.end();
  } catch (error) {
    console.log(error);
    res.json({ error });
    res.end();
  }
}
