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
    online = false,
  }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.password = password;
    this.verificationCode = verificationCode;
    this.isVerified = isVerified;
    this.blocked = blocked;
    this.online = online;
  }

  static schema = {
    firstName: {
      type: String,
      required: function() { return !this.lastName || !!this.firstName; },
      trim: true
    },
    lastName: {
      type: String,
      required: function() { return !this.firstName || !!this.lastName; },
      trim: true
    },
    email: { type: String, required: true, unique: true, trim: true },
    phoneNumber: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    verificationCode: { type: String, trim: true },
    isVerified: { type: Boolean, default: false },
    blocked: { type: Boolean, default: false },
    online: { type: Boolean, default: false },
  };

  serialize() {
    return {
      id: this._id.toString(),
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      isVerified: this.isVerified,
      blocked: this.blocked,
      online: this.online,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
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
