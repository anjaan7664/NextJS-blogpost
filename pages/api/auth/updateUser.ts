import connectMongo from "@/utils/connectMongo";
import User from "@/models/user.model";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ message: "You are not logedIn" });
  } else {
  try {
    await connectMongo();
    const userId =  req.query.userId;
    const userEmail = req.query.email;
    const userName = req.query.name;

    const blogPost = await User.updateOne(
      { _id: userId },
      {
        $set: {
         email: userEmail,
         name: userName
        },
      }
    );

    res.status(200).json({ message: "User updated!", metaData: blogPost });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}}
