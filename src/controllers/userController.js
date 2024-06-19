import { userListService } from "../services/userService.js";

const userListController = async (req, res) => {
  try {
    const users = await userListService(req.body);
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { userListController };
