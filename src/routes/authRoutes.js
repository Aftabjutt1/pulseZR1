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
} from "../controllers/userController.js";

import {
  validateSignup,
  validateLogin,
  validateResetPassword,
  validateUpdateUser,
} from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.post("/signup", validateSignup, signup);
router.post("/verify", verifyUser);
router.post("/login", validateLogin, login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", validateResetPassword, resetPassword);
router.get("/users", userListController);
router.post("/user", validateUpdateUser, userUpdateController);

export default router;
