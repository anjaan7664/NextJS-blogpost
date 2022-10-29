

import mongoose, { model, PaginateModel } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { UserInterface } from "@/types/userData.types";
export const UserSchema = new mongoose.Schema({
  name: String,
  email: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
  password: String,
  picture: String,
  email_verified: Boolean,
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now},
  role: {type: String, default: 'user'},
}, {collection: 'users'});

UserSchema.plugin(paginate);

type userDocument = UserInterface & mongoose.Document;

let User: PaginateModel<userDocument>;
try {
  // Throws an error if 'Name' hasn't been registered
  User = model("User") as PaginateModel<userDocument>;
} catch (e) {
  User = model<userDocument, PaginateModel<userDocument>>("User", UserSchema);
}
export default User;
