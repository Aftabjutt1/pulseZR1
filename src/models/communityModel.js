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

  static schema = {
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
  };

  serialize() {
    return {
      id: this._id.toString(),
      adminIds: this.adminIds.map((id) => id.toString()),
      memberIds: this.memberIds.map((id) => id.toString()),
      name: this.name,
      description: this.description,
      createdBy: this.createdBy.toString(),
      updatedBy: this.updatedBy.toString(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

const communitySchema = new mongoose.Schema(CommunityClass.schema, {
  collection: "community",
  timestamps: true,
});

communitySchema.loadClass(CommunityClass);

const Community = mongoose.model("Community", communitySchema);

export { Community };
