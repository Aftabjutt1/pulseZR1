import express from "express";
import userRoutes from "./userRoutes.js";
import communityRoutes from "./communityRoutes.js";

const router = express.Router();

router.use("", userRoutes);
router.use("", communityRoutes);

export default router;
