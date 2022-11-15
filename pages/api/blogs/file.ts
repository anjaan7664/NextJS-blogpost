import connectMongo from "lib/utils/connectMongo";
import Blog from "lib/models/blog.model";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import fs from "fs";
import formidable, { IncomingForm } from "formidable";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  const form = new IncomingForm();
  if (session) {
    res.status(401).json({ message: "You are not authorized" });
  } else {
    try {
      await connectMongo();


      form.parse(
        req,
        async function (
          err,
          fields: formidable.Fields,
          files: formidable.Files
        ) {
          console.log("pi");
          const file = files.image as formidable.File;

          const blogTitle = fields.title as string;
          const blogDescription = fields.description;
          const authorId = fields.authorId;
          const authorName = fields.authorName;
          const blogBody = fields.body;

          let slug = blogTitle.replaceAll(" ", "-");
          const blogPost = new Blog({
            title: blogTitle,
            description: blogDescription,
            body: blogBody,
            image: file.originalFilename,
            slug,
            authorId: authorId,
            authorName: authorName,
          });

          await blogPost.save();
          await saveFile(file);
          res.status(200).json({ message: "Blog created!" });
        }
      );
    } catch (error) {
      res.json({ error });
    }
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
