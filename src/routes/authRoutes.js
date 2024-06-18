import express from "express";
import { signup, verifyUser, login } from "../controllers/authController.js";

import { validateSignup, validateLogin } from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.post("/signup", validateSignup, signup);
router.post('/verify', verifyUser);
router.post('/login', validateLogin, login);

export default router;
