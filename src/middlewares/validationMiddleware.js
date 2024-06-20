import { Types } from "mongoose";
import { ReportedUserStatus } from "../models/reportedUserModel.js";
import { convertReportedUserStatusNameToType } from "../models/reportedUserModel.js";

const validateSignup = (req, res, next) => {
  const {
    first_name: firstName,
    last_name: lastName,
    email,
    phone_number: phoneNumber,
    password,
    confirm_password: confirmPassword,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phoneNumber ||
    !password ||
    !confirmPassword
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ error: "Password must be at least 8 characters long" });
  }

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // At least one letter and one number
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      error: "Password must contain at least one letter and one number",
    });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ error: "Password must be at least 8 characters long" });
  }

  next();
};

const validateResetPassword = (req, res, next) => {
  const { password, confirm_password: confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ error: "Password must be at least 8 characters long" });
  }

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // At least one letter and one number
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      error: "Password must contain at least one letter and one number",
    });
  }

  next();
};

const validateUpdateUser = (req, res, next) => {
  const { user_id: _id } = req.body;

  // Validate if _id is provided
  if (!_id) {
    return res.status(400).json({ error: "Id is required" });
  }

  // Check if _id is provided and if it matches the expected ObjectId length
  if (_id && !Types.ObjectId.isValid(_id)) {
    return res.status(400).json({ error: "Invalid Id format" });
  }

  // Proceed to the next middleware or controller
  next();
};

const validateRepotedUser = (req, res, next) => {
  const { user_id: userId, reporter_id: reporterId, reason } = req.body;

  // Validate if userId is provided
  if (!userId) {
    return res.status(400).json({ error: "UserId is required" });
  }

  // Check if userId is provided and if it matches the expected ObjectId length
  if (userId && !Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid UserId format" });
  }
  // Validate if user _id is provided
  if (!reporterId) {
    return res.status(400).json({ error: "ReporterId is required" });
  }

  // Check if reporterId is provided and if it matches the expected ObjectId length
  if (reporterId && !Types.ObjectId.isValid(reporterId)) {
    return res.status(400).json({ error: "Invalid ReporterId format" });
  }

  if (typeof reason !== "string") {
    return res.status(400).json({ error: "Invalid reason format" });
  }
  if (!reason || reason === "") {
    return res
      .status(400)
      .json({ error: "Reason is required to report a user" });
  }

  // Proceed to the next middleware or controller
  next();
};

const validateRepotedUserList = (req, res, next) => {
  const { status } = req.body;

  if (
    status &&
    !ReportedUserStatus.getAllReportedUserStatuses().includes(
      convertReportedUserStatusNameToType(status)
    )
  ) {
    return res.status(400).json({ error: "Invalid status" });
  }
  // Proceed to the next middleware or controller
  next();
};

export {
  validateSignup,
  validateLogin,
  validateResetPassword,
  validateUpdateUser,
  validateRepotedUser,
  validateRepotedUserList,
};
