import connectMongo from "@/utils/connectMongo";
import Blog from "@/models/blog.model";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import fs from "fs";
import formidable, { IncomingForm } from "formidable";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const form = new IncomingForm();
  form.parse(req, (err, fields, files) => {
   
    console.log(fields, files)
    res.status(200).json({ fields, files })
  })

//   const resp = await form.parse(req, (err, fields, files) => {
//     console.log("fields");
//     const newpath = "C:/Users/Rupesh/" + files.filetoupload.name;
//     var oldpath = files.filetoupload.path;

//     fs.rename(oldpath, newpath, function (err) {
//       if (err) throw err;
//       res.write(`${files.filetoupload.name} File uploaded and moved!`);
//       res.end();
//     });
//   });

  res.write(`TEsting`);
  res.end();
}
