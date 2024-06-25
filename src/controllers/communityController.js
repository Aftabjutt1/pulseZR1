import { getUserByIdService } from "../services/userService.js";
import {
  addMembersToCommunity,
  createCommunity,
  makeAdminOnCommunity,
  removeMembersFromCommunity,
  updateCommunity,
} from "../services/communityService.js";

const communityCreateController = async (req, res) => {
  try {
    const community = await createCommunity(req.body);
    res.status(200).json({
      message: "Community created successfully",
      data: community,
    });
  } catch (error) {
    console.error("Error creating the community: ", error);

    let statusCode = 500;
    if (
      error.message.includes("The user(s) does not exists against these id(s):")
    ) {
      statusCode = 400; // Bad request status
    } else if (
      error.message === "User is not authorized to perform this action"
    ) {
      statusCode = 400; // Bad Request
    }

    return res.status(statusCode).json({ error: error.message });
  }
};

const communityUpdateController = async (req, res) => {
  try {
    const community = await updateCommunity(req.body);
    res.status(200).json({
      message: "Community updated successfully",
      data: community,
    });
  } catch (error) {
    console.error("Error updating the community: ", error);

    let statusCode = 500;
    if (error.message === "Community not found") {
      statusCode = 404; // Not found status
    } else if (
      error.message.includes("The user(s) does not exists against these id(s):")
    ) {
      statusCode = 400; // Bad request status
    } else if (
      error.message === "User is not authorized to perform this action"
    ) {
      statusCode = 400; // Bad Request
    }

    return res.status(statusCode).json({ error: error.message });
  }
};

const addMembersToCommunityController = async (req, res) => {
  const {
    user_id: userId,
    community_id: communityId,
    member_ids: memberIds,
  } = req.body;

  try {
    const updatedCommunity = await addMembersToCommunity(
      userId,
      communityId,
      memberIds
    );

    return res.status(200).json({
      message: "Member added successfully",
      community: updatedCommunity,
    });
  } catch (error) {
    console.error("Error adding member:", error);

    let statusCode = 500;
    if (error.message === "Community not found") {
      statusCode = 404; // Not found status
    } else if (
      error.message === "User is not authorized to perform this action"
    ) {
      statusCode = 400; // Bad Request
    }

    return res.status(statusCode).json({ error: error.message });
  }
};

const removeMembersFromCommunityController = async (req, res) => {
  const {
    user_id: userId,
    community_id: communityId,
    member_ids: memberIds,
  } = req.body;

  try {
    const updatedCommunity = await removeMembersFromCommunity(
      userId,
      communityId,
      memberIds
    );

    return res.status(200).json({
      message: "Member removed successfully",
      community: updatedCommunity,
    });
  } catch (error) {
    console.error("Error removing member:", error);

    let statusCode = 500;
    if (error.message === "Community not found") {
      statusCode = 404; // Not found status
    } else if (
      error.message === "User is not authorized to perform this action"
    ) {
      statusCode = 400; // Bad Request
    }

    return res.status(statusCode).json({ error: error.message });
  }
};

const makeAdminOnCommunityController = async (req, res) => {
  const {
    community_id: communityId,
    user_id: userId,
    member_id: memberId,
  } = req.body;

  try {
    const updatedCommunity = await makeAdminOnCommunity(
      communityId,
      userId,
      memberId
    );

    return res.status(200).json({
      message: "Admin added successfully",
      community: updatedCommunity,
    });
  } catch (error) {
    console.error("Error making admin:", error);
    let statusCode = 500;
    if (
      error.message === "Community not found" ||
      error.message === "User is not authorized"
    ) {
      statusCode = 404; // Not found status
    }
    return res.status(statusCode).json({ error: error.message });
  }
};

export {
  communityCreateController,
  communityUpdateController,
  addMembersToCommunityController,
  removeMembersFromCommunityController,
  makeAdminOnCommunityController,
};
