import mongoose from "mongoose";

class CommunityClass {
  constructor({
    name,
    description,
    adminIds,
    memberIds,
    createdBy,
    updatedBy,
  }) {
    this.name = name;
    this.description = description;
    this.adminIds = adminIds;
    this.memberIds = memberIds;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
  }

  serialize() {
    return {
      id: this._id.toString(),
      adminIds: this.adminIds.map((id) => id.toString()),
      memberIds: this.memberIds.map((id) => id.toString()),
      name: this.name,
      description: this.description,
      createdBy: this.createdBy.toString(),
      updatedBy: this.updatedBy.toString(),
      createdAt: this.createdAt, // Make sure to populate createdAt and updatedAt in your document
      updatedAt: this.updatedAt,
    };
  }
}

const communitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    memberIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    adminIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    collection: "community",
    timestamps: true, // Automatically manages createdAt and updatedAt fields
  }
);

communitySchema.loadClass(CommunityClass);

const Community = mongoose.model("Community", communitySchema);

export { Community };
