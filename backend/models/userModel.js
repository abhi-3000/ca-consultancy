// backend/models/userModel.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkUserId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    firstName: String,
    lastName: String,
    role: {
      type: String,
      enum: ["Client", "Admin"],
      default: "Client",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
