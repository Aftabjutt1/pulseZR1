import { getUserByIdService } from "../services/userService.js";
import { createCommunityService } from "../services/communityService.js";

const communityCreateController = async (req, res) => {
  try {
    const community = await createCommunityService(req.body);
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
    const user = await getUserByIdService(req.body);
    res.status(200).json({
      message: "Community Update successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error: ", error);
    res.status(400).json({ error: error.message });
  }
};

export { communityCreateController, communityUpdateController };
