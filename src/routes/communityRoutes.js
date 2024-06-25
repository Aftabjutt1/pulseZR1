import express from "express";

import {
  addMembersToCommunityController,
  communityCreateController,
  communityUpdateController,
  makeAdminOnCommunityController,
  removeMembersFromCommunityController,
} from "../controllers/communityController.js";

import {
  validateaddMembersToCommunity,
  validateCreateCommunity,
  validateMakeAdmin,
  validateremoveMembersFromCommunity,
  validateUpdateCommunity,
} from "../middlewares/communityValidation.js";

const router = express.Router();

router.post(
  "/community/new",
  validateCreateCommunity,
  communityCreateController
);
router.post("/community", validateUpdateCommunity, communityUpdateController);
router.post(
  "/community/add-member",
  validateaddMembersToCommunity,
  addMembersToCommunityController
);
router.post(
  "/community/remove-member",
  validateremoveMembersFromCommunity,
  removeMembersFromCommunityController
);
router.post(
  "/community/make-admin",
  validateMakeAdmin,
  makeAdminOnCommunityController
);
// router.get("/community", communityListController);
// router.get("/community", communityListController);

export default router;
