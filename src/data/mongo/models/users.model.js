import { Schema, model } from "mongoose";

const collection = "users";
const schema = new Schema(
  {
    name: { type: String },
    age: { type: Number },
    date: { type: Date },
    city: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: { type: String, default: "user", enum: ["user", "admin", "prem"], index: true },
    avatar: {
      type: String,
      default:
        "https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png",
    },
    isVerify: { type: Boolean, default: false },
    verifyCode: { type: String, required: true },
  },
  { timestamps: true }
);

const User = model(collection, schema);

export default User;
