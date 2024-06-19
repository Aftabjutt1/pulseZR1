import {
  signupService,
  verifyUserService,
  loginService,
  forgotPasswordService,
  resetPasswordService,
} from "../services/authService.js";

const signup = async (req, res) => {
  try {
    const user = await signupService(req.body);
    res.status(200).json({
      message:
        "User created successfully. Please check your email for the verification code.",
      data: user,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const verifyUser = async (req, res) => {
  const { email, verification_code: verificationCode } = req.body;

  try {
    const user = await verifyUserService(email, verificationCode);
    res
      .status(200)
      .json({ message: "Email verified successfully", data: user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await loginService(email, password);
    res.status(200).json({
      message: "User successfully logged in",
      data: user,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await forgotPasswordService(email);
    res.status(200).json({
      message: "An authentication code has been sent to your email.",
      data: user,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const user = await resetPasswordService(req.body);
    res.status(200).json({
      message: "Password reset successfully.",
      data: user,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { signup, verifyUser, login, forgotPassword, resetPassword };
