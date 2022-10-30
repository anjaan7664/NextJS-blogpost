import mongoose, { model, PaginateModel } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { BlogInterface } from "@/types/blogData.types";
export const BlogSchema = new mongoose.Schema(
  {
    title: String,
    body: String,
    authorId: String,
    slug: String,
    status: { type: String, default: 'pending' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { collection: "blogs" }
);

BlogSchema.plugin(paginate);

type blogDocument = BlogInterface & mongoose.Document;

let Blog: PaginateModel<blogDocument>;
try {
  // Throws an error if 'Name' hasn't been registered
  Blog = model("Blog") as PaginateModel<blogDocument>;
} catch (e) {
  Blog = model<blogDocument, PaginateModel<blogDocument>>("Blog", BlogSchema);
}
export default Blog;
