import { User } from "../models/userModel.js";
import { checkRecordsExist } from "./util.js";
import { Community } from "../models/communityModel.js";

const createCommunity = async (communityData) => {
  try {
    const {
      user_id: userId,
      member_ids: memberIds,
      admin_ids: adminIds,
      name,
      description,
    } = communityData;

    const userIds = [...new Set([...memberIds, ...adminIds, userId])];

    const { allExist, missingIds } = await checkRecordsExist(userIds, User);
    if (!allExist) {
      throw new Error(
        `The user(s) does not exists against these id(s): ${missingIds}`
      );
    }

    const community = await new Community({
      name,
      description,
      adminIds,
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

    const userIds = [userId];

    const { allExist, missingIds } = await checkRecordsExist(userIds, User);
    if (!allExist) {
      throw new Error(
        `The user(s) does not exists against these id(s): ${missingIds}`
      );
    }

    const community = await Community.findByIdAndUpdate(
      communityId,
      {
        name,
        description,
        updatedBy: userId,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!community) {
      throw new Error("Community not found");
    }

    return community.serialize();
  } catch (error) {
    throw error;
  }
};

const addMembersToCommunity = async (communityId, memberIds) => {
  try {
    const community = await Community.findById(communityId);
    if (!community) {
      throw new Error("Community not found");
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
      await community.save();
    } else {
      console.log("No new members to add, skipping save operation.");
    }

    return community.serialize();
  } catch (error) {
    throw error;
  }
};

const removeMembersFromCommunity = async (communityId, memberIds) => {
  try {
    const community = await Community.findById(communityId);
    if (!community) {
      throw new Error(`Community not found`);
    }

    let shouldSave = false; // Flag to track if changes should be saved

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
      await community.save();
    } else {
      console.log("No members removed, skipping save operation.");
    }

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
  countOnlineUsers,
};
