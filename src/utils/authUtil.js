import crypto from "crypto";

const generateVerificationCode = () => {
  return crypto.randomBytes(3).toString("hex"); // Generate a 6-character verification code
};

export { generateVerificationCode };
