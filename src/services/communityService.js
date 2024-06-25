import { User } from "../models/userModel.js";
import { checkRecordsExist } from "./util.js";
import { Community } from "../models/communityModel.js";

const createCommunity = async (communityData) => {
  // NOTE: In creating the community the user which is creating the community will be only admin
  //  and it will aslo be a member and can add mulitple mebers at the time of creation
  try {
    const {
      user_id: userId,
      member_ids: memberIds,
      name,
      description,
    } = communityData;

    const userIds = [...new Set([...memberIds, userId])];

    const { allExist, missingIds } = await checkRecordsExist(userIds, User);
    if (!allExist) {
      throw new Error(
        `The user(s) does not exists against these id(s): ${missingIds}`
      );
    }

    const community = await new Community({
      name,
      description,
      adminIds: [userId],
      memberIds,
      createdBy: userId,
      updatedBy: userId,
    }).save();

    return community.serialize();
  } catch (error) {
    throw error;
  }
};

const updateCommunity = async (updateData) => {
  try {
    const {
      community_id: communityId,
      user_id: userId,
      name,
      description,
    } = updateData;

    // Find the community and check if it exists
    const community = await Community.findById(communityId);
    if (!community) {
      throw new Error("Community not found");
    }

    // Check if the user is authorized (exists in adminIds)
    const isAuthorized = community.adminIds.includes(userId);
    if (!isAuthorized) {
      throw new Error("User is not authorized to perform this action");
    }

    // Update the community if authorized
    const updatedCommunity = await Community.findByIdAndUpdate(
      communityId,
      {
        name,
        description,
        updatedBy: userId,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updatedCommunity) {
      throw new Error("Community update failed");
    }

    return updatedCommunity.serialize();
  } catch (error) {
    throw error;
  }
};

const addMembersToCommunity = async (userId, communityId, memberIds) => {
  try {
    const community = await Community.findById(communityId);
    if (!community) {
      throw new Error("Community not found");
    }

    // Check if user is an admin of the community
    const isAuthorized = await Community.exists({
      _id: communityId,
      adminIds: { $in: [userId] },
    });

    if (!isAuthorized) {
      throw new Error("User is not authorized to perform this action");
    }

    const existingMembers = new Set(
      community.memberIds.map((id) => id.toString())
    );
    let shouldSave = false;

    for (const memberId of memberIds) {
      if (existingMembers.has(memberId)) {
        console.log(
          `Skipping user ${memberId}: User is already a member of this community`
        );
        continue; // Skip adding this member
      }

      community.memberIds.push(memberId);
      shouldSave = true;
    }

    if (shouldSave) {
      community.updatedBy = userId; // Update updatedBy property
      await community.save();
    } else {
      console.log("No new members to add, skipping save operation.");
    }

    return community.serialize();
  } catch (error) {
    throw error;
  }
};

const removeMembersFromCommunity = async (userId, communityId, memberIds) => {
  try {
    const community = await Community.findById(communityId);
    if (!community) {
      throw new Error("Community not found");
    }

    // Check if user is an admin of the community
    const isAuthorized = await Community.exists({
      _id: communityId,
      adminIds: { $in: [userId] },
    });

    if (!isAuthorized) {
      throw new Error("User is not authorized to perform this action");
    }

    let shouldSave = false;

    for (const memberId of memberIds) {
      if (!community.memberIds.includes(memberId)) {
        console.log(`Member ${memberId} not found in the community, skipping.`);
        continue; // Skip processing this member
      }

      community.memberIds = community.memberIds.filter(
        (id) => id.toString() !== memberId
      );

      community.adminIds = community.adminIds.filter(
        (id) => id.toString() !== memberId
      );

      shouldSave = true; // Set flag to indicate changes have been made
    }

    if (shouldSave) {
      community.updatedBy = userId; // Update updatedBy property
      await community.save();
    } else {
      console.log("No members removed, skipping save operation.");
    }

    return community.serialize();
  } catch (error) {
    throw error;
  }
};

const makeAdminOnCommunity = async (communityId, userId, memberId) => {
  try {
    const community = await Community.findById(communityId);
    if (!community) {
      throw new Error("Community not found");
    }

    // Check if user is an admin of the community
    const isAuthorized = await Community.exists({
      _id: communityId,
      adminIds: { $in: [userId] },
    });

    if (!isAuthorized) {
      throw new Error("User is not authorized to perform this action");
    }

    // Update adminIds if not already an admin
    if (!community.adminIds.includes(memberId)) {
      community.adminIds.push(memberId);
    } else {
      console.log(`User ${memberId} is already an admin of this community`);
    }

    await community.save();

    return community.serialize();
  } catch (error) {
    throw error;
  }
};

const countOnlineUsers = async (communityId) => {
  try {
    const community = await Community.findById(communityId).populate(
      "memberIds"
    );

    const memberIds = community.memberIds;

    // Count online users
    const onlineUsers = await User.countDocuments({
      _id: { $in: memberIds },
      online: true,
    });

    return onlineUsers;
  } catch (err) {
    throw new Error(`Failed to count online users: ${err.message}`);
  }
};

export {
  createCommunity,
  updateCommunity,
  addMembersToCommunity,
  removeMembersFromCommunity,
  makeAdminOnCommunity,
  countOnlineUsers,
};
