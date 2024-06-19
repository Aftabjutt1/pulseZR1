import { User } from "../models/userModel.js";

const userListService = async () => {
  try {
    const users = await User.find({ isVerified: true });
    const serializedUsers = users.map((user) => User.serialize(user));
    return serializedUsers;
  } catch (error) {
    console.error("Error: ", error);
    throw new Error(`Failed to fetch user list: ${error.message}`);
  }
};

export { userListService };
