import {
  signupUser,
  verifyUserService,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
} from "../services/authService.js";

const signupController = async (req, res) => {
  try {
    const user = await signupUser(req.body);
    res.status(200).json({
      message:
        "User created successfully. Please check your email for the verification code.",
      data: user,
    });
  } catch (error) {
    console.error("Error: ", error);
    res.status(400).json({ error: error.message });
  }
};

const verifyUserController = async (req, res) => {
  const { email, verification_code: verificationCode } = req.body;

  try {
    const user = await verifyUserService(email, verificationCode);
    res
      .status(200)
      .json({ message: "Email verified successfully", data: user });
  } catch (error) {
    console.error("Error: ", error);
    res.status(400).json({ error: error.message });
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await loginUser(email, password);
    res.status(200).json({
      message: "User successfully logged in",
      data: user,
    });
  } catch (error) {
    console.error("Error: ", error);
    res.status(400).json({ error: error.message });
  }
};

const logoutController = async (req, res) => {
  const { user_id: userId } = req.body;
  try {
    const user = await logoutUser(userId);
    res.status(200).json({
      message: "User successfully logged out",
      data: user,
    });
  } catch (error) {
    console.error("Error: ", error);
    res.status(400).json({ error: error.message });
  }
};

const forgotPasswordController = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await forgotPassword(email);
    res.status(200).json({
      message: "An authentication code has been sent to your email.",
      data: user,
    });
  } catch (error) {
    console.error("Error: ", error);
    res.status(400).json({ error: error.message });
  }
};

const resetPasswordController = async (req, res) => {
  try {
    const user = await resetPassword(req.body);
    res.status(200).json({
      message: "Password reset successfully.",
      data: user,
    });
  } catch (error) {
    console.error("Error: ", error);
    res.status(400).json({ error: error.message });
  }
};

export {
  signupController,
  verifyUserController,
  loginController,
  logoutController,
  forgotPasswordController,
  resetPasswordController,
};
