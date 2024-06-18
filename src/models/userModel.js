import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    verificationCode: { type: String },
    isVerified: { type: Boolean, default: false },
    blocked: { type: Boolean, default: false }, // Add blocked status
  },
  {
    collection: "user",
    timestamps: true, // Enable automatic createdAt and updatedAt
  }
);

const User = mongoose.model("User", userSchema);

export { User };
