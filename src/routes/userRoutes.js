import express from "express";

import {
  signupController,
  verifyUserController,
  loginController,
  logoutController,
  forgotPasswordController,
  resetPasswordController,
} from "../controllers/authController.js";
import {
  userListController,
  userByIdController,
  userUpdateController,
  reportedUserController,
  reportedUserListController,
} from "../controllers/userController.js";
import {
  validateSignup,
  validateLogin,
  validateLogout,
  validateResetPassword,
  validateUpdateUser,
  validateGetUser,
  validateRepotedUser,
  validateRepotedUserList,
} from "../middlewares/userValidation.js";

const router = express.Router();

router.post("/user/signup", validateSignup, signupController);
router.post("/user/verify", verifyUserController);
router.post("/user/login", validateLogin, loginController);
router.post("/user/logout", validateLogout, logoutController);
router.post("/user/forgot-password", forgotPasswordController);
router.post("/user/reset-password", validateResetPassword, resetPasswordController);
router.get("/users", userListController);
router.post("/user", validateUpdateUser, userUpdateController);
router.get("/user", validateGetUser, userByIdController);
router.post("/report-user", validateRepotedUser, reportedUserController);
router.get(
  "/reported-users",
  validateRepotedUserList,
  reportedUserListController
);

export default router;
