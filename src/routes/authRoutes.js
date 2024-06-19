import express from "express";
import {
  signup,
  verifyUser,
  login,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

import {
  validateSignup,
  validateLogin,
  validateResetPassword,
} from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.post("/signup", validateSignup, signup);
router.post("/verify", verifyUser);
router.post("/login", validateLogin, login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", validateResetPassword, resetPassword);

export default router;
