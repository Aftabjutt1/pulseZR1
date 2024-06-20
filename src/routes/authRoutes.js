import express from "express";
import {
  signup,
  verifyUser,
  login,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";
import {
  userListController,
  userUpdateController,
  reportedUserController,
  reportedUserListController,
} from "../controllers/userController.js";

import {
  validateSignup,
  validateLogin,
  validateResetPassword,
  validateUpdateUser,
  validateRepotedUser,
  validateRepotedUserList,
} from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.post("/signup", validateSignup, signup);
router.post("/verify", verifyUser);
router.post("/login", validateLogin, login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", validateResetPassword, resetPassword);
router.get("/users", userListController);
router.post("/user", validateUpdateUser, userUpdateController);
router.post("/report-user", validateRepotedUser, reportedUserController);
router.get(
  "/reported-users",
  validateRepotedUserList,
  reportedUserListController
);

export default router;
