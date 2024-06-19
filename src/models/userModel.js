import mongoose from "mongoose";

class UserClass {
  constructor({
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    verificationCode,
    isVerified = false,
    blocked = false,
  }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.password = password;
    this.verificationCode = verificationCode;
    this.isVerified = isVerified;
    this.blocked = blocked;
  }

  static schema = {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    verificationCode: { type: String },
    isVerified: { type: Boolean, default: false },
    blocked: { type: Boolean, default: false },
  };

  static serialize(user) {
    return {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      isVerified: user.isVerified,
      blocked: user.blocked,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}

const userSchema = new mongoose.Schema(UserClass.schema, {
  collection: "user",
  timestamps: true,
});

userSchema.loadClass(UserClass);

const User = mongoose.model("User", userSchema);

export { User };
