import {
  userListService,
  getUserByIdService,
  userUpdateService,
  reportUserService,
  reportUserListService,
} from "../services/userService.js";

const userListController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 100; // Default to 100 users per page if not provided

    const users = await userListService(page, limit);
    res.status(200).json(users);
  } catch (error) {
    console.error("Error: ", error);
    res.status(400).json({ error: error.message });
  }
};

const userByIdController = async (req, res) => {
  try {
    const { id } = req.query;

    const user = await getUserByIdService(id);
    res.status(200).json(user);
  } catch (error) {
    console.error("Error: ", error);
    res.status(400).json({ error: error.message });
  }
};

const userUpdateController = async (req, res) => {
  try {
    const user = await userUpdateService(req.body);
    res.status(200).json({
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error: ", error);
    res.status(400).json({ error: error.message });
  }
};

const reportedUserController = async (req, res) => {
  try {
    const user = await reportUserService(req.body);
    res.status(200).json({
      message: "User reported successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error: ", error);
    res.status(400).json({ error: error.message });
  }
};

const reportedUserListController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 100; // Default to 100 users per page if not provided
    const status = req.query.status || null;

    const user = await reportUserListService(page, limit, status);
    res.status(200).json({
      message: "User reported successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error: ", error);
    res.status(400).json({ error: error.message });
  }
};

export {
  userListController,
  userUpdateController,
  userByIdController,
  reportedUserController,
  reportedUserListController,
};
