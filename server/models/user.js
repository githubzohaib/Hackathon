// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["farmer", "expert", "admin", "buyer"],
      default: "farmer",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
