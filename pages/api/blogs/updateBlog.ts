import connectMongo from "@/utils/connectMongo";
import Blog from "@/models/blog.model";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import formidable, { IncomingForm } from "formidable";
import fs from "fs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ message: "You are not authorized" });
  } else {
    await connectMongo();
    const data = await new Promise((resolve, reject) => {
      const form = new IncomingForm();

      form.parse(
        req,
        async function (
          err,
          fields: formidable.Fields,
          files: formidable.Files
        ) {
          const file = files.image as formidable.File;
          const blogId = fields.blogId;
          const blogTitle = fields.title;
          const blogBody = fields.body;
          const blogPost = await Blog.updateOne(
            { _id: blogId },
            {
              $set: {
                title: blogTitle,
                image: file.originalFilename,
                body: blogBody,
              },
            }
          );
          saveFile(file);
          res.status(200).json({ message: "Blog updated!" });
          res.end();
        }
      );
    });
  }
}
export const saveFile = (file: formidable.File) => {
  const oldpath = file.filepath;
  const newpath =
    "C:/Users/soni7/Documents/Projects/kooky-project/public/assets/images/blogs/" +
    file.originalFilename;
  fs.rename(oldpath, newpath, function (err) {
    if (err) throw err;
  });
};
export const config = {
  api: {
    bodyParser: false,
  },
};
