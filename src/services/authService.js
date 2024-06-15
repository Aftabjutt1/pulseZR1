import User from "../models/userModel.js";

const signupService = async (userData) => {
  const { first_name, last_name, email, phone_number, password } = userData;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already in use");
  }

  const user = new User({
    first_name,
    last_name,
    email,
    phone_number,
    password,
  });
  await user.save();

  return user;
};

export { signupService };
