import bcrypt from "bcrypt";
import { User } from "../models/userModel.js";
import { generateVerificationCode } from "../utils/authUtil.js";
// import { sendVerificationEmail } from "../utils/email.js";

const signupUser = async (userData) => {
  try {
    const {
      first_name: firstName,
      last_name: lastName,
      email,
      phone_number: phoneNumber,
      password,
    } = userData;

    const user = await User.findOne({ email });
    if (user) {
      throw new Error("User already exists with this email");
    }

    const hashedPassword = await bcrypt.hash(password.trim(), 12);
    const verificationCode = generateVerificationCode();

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
  } catch (error) {
    console.error("Error in signupUser:", error);
    throw new Error(`Failed to signup user: ${error.message}`);
  }
};

const verifyUserService = async (email, verificationCode) => {
  try {
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

    return user.serialize();
  } catch (error) {
    console.error("Error in verifyUserService:", error);
    throw new Error(`Failed to verify user: ${error.message}`);
  }
};

const loginUser = async (email, password) => {
  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(
      password.trim(),
      user.password
    );
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    // Check if the user is verified
    if (!user.isVerified) {
      throw new Error("Account is not verified. Please verify your email.");
    }

    // Check if the user is blocked
    if (user.blocked) {
      throw new Error("Your account is blocked. Please contact support.");
    }

    if (user.verificationCode) {
      user.verificationCode = undefined; // Remove the verification code once verified
      await user.save();
    }

    return user.serialize();
  } catch (error) {
    console.error("Error in loginUser:", error);
    throw new Error(`Failed to login user: ${error.message}`);
  }
};

const logoutUser = async (userId) => {
  try {
    // Check if the user exists
    const user = await User.findById(id);
    if (!user) {
      throw new Error(`User not exists against id: ${userId}`);
    }
    user.online = false;
    await user.save();
  } catch (error) {
    console.error("Error in logoutUser:", error);
    throw new Error(`Failed to process logout user request: ${error.message}`);
  }
};

const forgotPassword = async (email) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    user.verificationCode = generateVerificationCode();
    await user.save();
    // Send verification code to user's email or phone number
    // await sendVerificationEmail(email, verificationCode);
    return user.serialize();
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    throw new Error(
      `Failed to process forgot password request: ${error.message}`
    );
  }
};

const resetPassword = async (requestBody) => {
  try {
    const { email, password } = requestBody;
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const hashedPassword = await bcrypt.hash(password.trim(), 12);
    user.password = hashedPassword;

    await user.save();
    return user.serialize();
  } catch (error) {
    console.error("Error in resetPassword:", error);
    throw new Error(`Failed to reset password: ${error.message}`);
  }
};

export {
  signupUser,
  verifyUserService,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
};
