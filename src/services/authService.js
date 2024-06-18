import bcrypt from "bcryptjs";
import crypto from "crypto";
import { User } from "../models/userModel.js";
import { sendVerificationEmail } from "../utils/email.js";

const signupService = async (userData) => {
  const {
    first_name: firstName,
    last_name: lastName,
    email,
    phone_number: phoneNumber,
    password,
  } = userData;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const verificationCode = crypto.randomBytes(3).toString("hex"); // Generate a 6-character verification code

  const newUser = new User({
    firstName,
    lastName,
    email,
    phoneNumber,
    password: hashedPassword,
    verificationCode,
    isVerified: false,
    blocked: false,
  });

  await newUser.save();
  // await sendVerificationEmail(email, verificationCode);

  return newUser;
};

const verifyUserService = async (email, verificationCode) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.verificationCode !== verificationCode) {
    throw new Error("Invalid verification code");
  }

  user.isVerified = true;
  user.verificationCode = undefined; // Remove the verification code once verified
  await user.save();

  return user;
};

export { signupService, verifyUserService };
