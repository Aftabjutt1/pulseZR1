import { User } from "../models/userModel.js";

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
      const serializedUser = User.serialize(user);
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
    return User.serialize(updatedUser);
  } catch (error) {
    console.error("Error: ", error);
    throw new Error(`Failed to update user: ${error.message}`);
  }
};

export { userListService, userUpdateService };
