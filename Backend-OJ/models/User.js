import { model, Schema } from "mongoose";

const UserSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  problems: {
    type: [Schema.Types.ObjectId],
    ref: "Problem",
  },
});

export const User = model("User", UserSchema);
