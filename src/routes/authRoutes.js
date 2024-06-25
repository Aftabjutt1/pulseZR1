import express from "express";
import {
  signup,
  verifyUser,
  login,
  logout,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";
import {
  userListController,
  userByIdController,
  userUpdateController,
  reportedUserController,
  reportedUserListController,
} from "../controllers/userController.js";

import { communityCreateController } from "../controllers/communityController.js";

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

import { validateUpsertCommunity } from "../middlewares/communityValidation.js";

const router = express.Router();

// User APIs
router.post("/signup", validateSignup, signup);
router.post("/verify", verifyUser);
router.post("/login", validateLogin, login);
router.post("/logout", validateLogout, logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", validateResetPassword, resetPassword);
router.get("/users", userListController);
router.post("/user", validateUpdateUser, userUpdateController);
router.get("/user", validateGetUser, userByIdController);
router.post("/report-user", validateRepotedUser, reportedUserController);
router.get(
  "/reported-users",
  validateRepotedUserList,
  reportedUserListController
);

// Comunity APIs
router.post("/community", validateUpsertCommunity, communityCreateController);
// router.post("/community", validateUpsertCommunity, communityUpdateController);
// router.get("/community", communityListController);
// router.get("/community", communityListController);

export default router;
