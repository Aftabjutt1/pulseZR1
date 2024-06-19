import { userListService } from "../services/userService.js";

const userListController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 100; // Default to 100 users per page if not provided

    const users = await userListService(page, limit);
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { userListController };
