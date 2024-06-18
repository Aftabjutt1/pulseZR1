import bcrypt from "bcrypt";
import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
// import { sendVerificationEmail } from "../utils/email.js";

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

  const hashedPassword = await bcrypt.hash(password.trim(), 12);
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

  return {
    user: {
      id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      phoneNumber: newUser.phoneNumber,
      isVerified: newUser.isVerified,
      blocked: newUser.blocked,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    },
  };
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

const loginService = async (email, password) => {
  // Check if the user exists
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    throw new Error("Invalid email or password");
  }

  // Check if the user is verified
  if (!existingUser.isVerified) {
    throw new Error("Account is not verified. Please verify your email.");
  }

  // Check if the user is blocked
  if (existingUser.blocked) {
    throw new Error("Your account is blocked. Please contact support.");
  }

  // Verify the password
  const isPasswordValid = await bcrypt.compare(
    password.trim(),
    existingUser.password
  );
  console.log("Is Password Valid: ", isPasswordValid);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  // Generate a JWT
  const token = jwt.sign(
    { userId: existingUser._id, email: existingUser.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return {
    token,
    user: {
      id: existingUser._id,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      email: existingUser.email,
      phoneNumber: existingUser.phoneNumber,
    },
  };
};

export { signupService, verifyUserService, loginService };
