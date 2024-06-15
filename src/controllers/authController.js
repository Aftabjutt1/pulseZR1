import { signupService } from "../services/authService.js";

export const signup = async (req, res) => {
  try {
    const user = await signupService(req.body);
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
