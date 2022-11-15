import { hashPassword } from "lib/utils/auth";
import connectMongo from "lib/utils/connectMongo";
import User from "lib/models/user.model";
import type { NextApiRequest, NextApiResponse } from "next";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const name = req.body.name as string;
  const email = req.body.email as string;
  const password = req.body.password as string;

  await connectMongo();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(422).json({ message: "User Exists" });
    return;
  }

  const hashedPassword = await hashPassword(password);
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });
  await newUser.save();

  return res.status(200).json({ message: "User created!", user: newUser });
}

export default handler;
