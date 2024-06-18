const validateSignup = (req, res, next) => {
  const {
    first_name: firstName,
    last_name: lastName,
    email,
    phone_number: phoneNumber,
    password,
    confirm_password: confirmPassword,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phoneNumber ||
    !password ||
    !confirmPassword
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  next();
};

export { validateSignup };
