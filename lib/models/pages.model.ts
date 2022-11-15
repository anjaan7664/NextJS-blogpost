import mongoose from "mongoose";

const PageSchema = new mongoose.Schema(
  {
    link_name: { type: String },
    title: { type: String },
    description: { type: String },
    image: { type: String },
  },
  { collection: "pages" }
);

export default mongoose.models.Pages || mongoose.model("Pages", PageSchema);
