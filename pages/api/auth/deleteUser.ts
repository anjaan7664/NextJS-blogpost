import connectMongo from "@/utils/connectMongo";
import User from "@/models/user.model";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session || session.user?.role === "user") {
    res.status(401).json({ message: "You are not authorized" });
  } else {
    try {
      await connectMongo();
      const userId = req.query.userId;
      const data = await User.deleteOne({ _id: userId });
      res.status(200).json({ message: "User deleted!", metaData: data });
    } catch (error) {
      res.json({ error });
    }
  }
}
