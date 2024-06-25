import { User } from "../models/userModel.js";
import { checkRecordsExist } from "./util.js";
import { Community } from "../models/communityModel.js";

const createCommunityService = async (communityData) => {
  try {
    const {
      user_id: userId,
      member_ids: memberIds,
      admin_ids: adminIds,
      name,
      description,
    } = communityData;

    const userIds = [...new Set([...memberIds, ...adminIds, userId])];

    console.log("userIds: ", userIds);
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
    console.error("Error: ", error);
    throw error;
  }
};


const countOnlineUsers = async (communityId) => {
  try {
    const community = await Community.findById(communityId)
      .populate('memberIds')
      
    const memberIds = community.memberIds;
    
    // Count online users
    const onlineUsers = await User.countDocuments({ _id: { $in: memberIds }, online: true });

    return onlineUsers;
  } catch (err) {
    console.error(err);
    throw new Error(`Failed to count online users: ${err.message}`);
  }
};

export { createCommunityService, countOnlineUsers };
