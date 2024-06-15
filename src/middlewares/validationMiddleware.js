const validateSignup = (req, res, next) => {
  const { first_name, last_name, email, phone_number, password, confirm_password } =
    req.body;

  if (
    !first_name ||
    !last_name ||
    !email ||
    !phone_number ||
    !password ||
    !confirm_password
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (password !== confirm_password) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  next();
};

export { validateSignup };
