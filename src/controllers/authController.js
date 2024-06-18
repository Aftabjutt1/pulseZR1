import { signupService, verifyUserService } from "../services/authService.js";

const signup = async (req, res) => {
  try {
    const user = await signupService(req.body);
    res.status(201).json({
      message:
        "User created successfully. Please check your email for the verification code.",
      user,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const verifyUser = async (req, res) => {
  const { email, verification_code: verificationCode } = req.body;

  try {
    const user = await verifyUserService(email, verificationCode);
    res.status(200).json({ message: "Email verified successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export { signup, verifyUser };
