import express from "express";

import {
  communityCreateController,
  communityUpdateController,
} from "../controllers/communityController.js";

import {
  validateCreateCommunity,
  validateUpdateCommunity,
} from "../middlewares/communityValidation.js";

const router = express.Router();

router.post("/community", validateCreateCommunity, communityCreateController);
router.post("/community", validateUpdateCommunity, communityUpdateController);
// router.get("/community", communityListController);
// router.get("/community", communityListController);

export default router;
