import { User } from "../models/userModel.js";
import {
  ReportedUser,
  ReportedUserStatus,
  convertReportedUserStatusNameToType,
} from "../models/reportedUserModel.js";

const userListService = async (page = 1, limit = 10) => {
  try {
    // Calculate skip value based on page number and limit
    const skip = (page - 1) * limit;

    // Query users with pagination and isVerified condition
    const users = await User.find({ isVerified: true })
      .skip(skip)
      .limit(limit)
      .lean(); // Convert Mongoose documents to plain JavaScript objects for better performance

    // Separate blocked and unblocked users during mapping
    const serializedUsers = {
      activeUsers: [],
      blockedUsers: [],
    };

    users.forEach((user) => {
      const serializedUser = user.serialize();
      if (user.blocked) {
        serializedUsers.blockedUsers.push(serializedUser);
      } else {
        serializedUsers.activeUsers.push(serializedUser);
      }
    });

    return serializedUsers;
  } catch (error) {
    console.error("Error: ", error);
    throw new Error(`Failed to fetch user list: ${error.message}`);
  }
};

const userUpdateService = async (userData) => {
  try {
    const { user_id: _id, ...updateData } = userData; // Extract userId and rest of the fields from userData

    // Find the user by userId and update the fields specified in updateData
    const updatedUser = await User.findByIdAndUpdate(_id, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Run Mongoose validators for updates
    });

    if (!updatedUser) {
      throw new Error("User not found or could not be updated");
    }
    return updatedUser.serialize();
  } catch (error) {
    console.error("Error: ", error);
    throw new Error(`Failed to update user: ${error.message}`);
  }
};

const reportUserService = async (requestContent) => {
  try {
    const {
      user_id: userId,
      reporter_id: reporterId,
      reason,
      description,
    } = requestContent;
    const user = await User.findById({ _id: userId });

    if (!user) {
      throw new Error(`User not found against id: ${userId}`);
    }

    const reporter = await User.findById({ _id: reporterId });
    if (!reporter) {
      throw new Error(`Reporter not found against id: ${reporterId}`);
    }

    const reportedUser = await new ReportedUser({
      userId,
      reporterId,
      reason,
      description,
      status: ReportedUserStatus.PENDING,
      adminNotes: "",
    }).save();

    return reportedUser.serialize();
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
};

const reportUserListService = async (page = 1, limit = 10, status = null) => {
  try {
    // Calculate skip value based on page number and limit
    const skip = (page - 1) * limit;

    const filter =
      status !== null && status !== ""
        ? { status: convertReportedUserStatusNameToType(status) }
        : {};
    // Query users with pagination and isVerified condition
    const reportedUsers = await ReportedUser.find(filter)
      .skip(skip)
      .limit(limit);

    // Separate blocked and unblocked users during mapping
    const result =
      reportedUsers && reportedUsers.length
        ? reportedUsers.map((reportedUser) => {
            return reportedUser.serialize();
          })
        : [];

    return result;
  } catch (error) {
    console.error("Error: ", error);
    throw new Error(`Failed to fetch user list: ${error.message}`);
  }
};

export {
  userListService,
  userUpdateService,
  reportUserService,
  reportUserListService,
};
