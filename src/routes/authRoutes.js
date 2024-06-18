import express from "express";
import { signup, verifyUser } from "../controllers/authController.js";

import { validateSignup } from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.post("/signup", validateSignup, signup);
router.post('/verify', verifyUser);

export default router;
