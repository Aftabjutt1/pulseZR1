import { getUserByIdService } from "../services/userService.js";
import {
  createCommunity,
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
    console.error("Error: ", error);
    res.status(400).json({ error: error.message });
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
    console.error("Error: ", error);
    res.status(400).json({ error: error.message });
  }
};

export { communityCreateController, communityUpdateController };
