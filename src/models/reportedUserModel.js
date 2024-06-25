import mongoose from "mongoose";

// Define static status codes and names
const ReportedUserStatus = {
  PENDING: 1000,
  RESOLVED: 1001,
  REJECTED: 1002,

  getAllStatuses() {
    return [this.PENDING, this.RESOLVED, this.REJECTED];
  }
};

const ReportedUserStatusName = {
  PENDING: "PENDING",
  RESOLVED: "RESOLVED",
  REJECTED: "REJECTED",

  getAllStatusNames() {
    return [this.PENDING, this.RESOLVED, this.REJECTED];
  }
};

// Helper functions to convert between status and status name
const convertReportedUserStatusNameToType = (status) => {
  switch (status) {
    case ReportedUserStatus.PENDING:
      return ReportedUserStatusName.PENDING;
    case ReportedUserStatus.RESOLVED:
      return ReportedUserStatusName.RESOLVED;
    case ReportedUserStatus.REJECTED:
      return ReportedUserStatusName.REJECTED;
    default:
      return ReportedUserStatusName.PENDING;
  }
};

const convertReportedUserStatusToName = (statusName) => {
  switch (statusName) {
    case ReportedUserStatusName.PENDING:
      return ReportedUserStatus.PENDING;
    case ReportedUserStatusName.RESOLVED:
      return ReportedUserStatus.RESOLVED;
    case ReportedUserStatusName.REJECTED:
      return ReportedUserStatus.REJECTED;
    default:
      return ReportedUserStatus.PENDING;
  }
};

class ReportedUserClass {
  constructor({
    userId,
    reporterId,
    reason,
    description,
    reportedTime,
    status,
    adminNotes,
    resolution,
  }) {
    this.userId = userId;
    this.reporterId = reporterId;
    this.reason = reason;
    this.description = description;
    this.reportedTime = reportedTime;
    this.status = status;
    this.adminNotes = adminNotes;
    this.resolution = resolution;
  }

  serialize() {
    return {
      id: this._id.toString(),
      userId: this.userId.toString(),
      reporterId: this.reporterId.toString(),
      reason: this.reason,
      description: this.description,
      reportedTime: this.reportedTime,
      status: convertStatusToName(this.status),
      adminNotes: this.adminNotes,
      resolution: this.resolution,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

// Define ReportedUser schema and class
const reportedUserSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reporterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reason: { type: String, required: true },
  description: { type: String },
  reportedTime: { type: Date, default: Date.now },
  status: {
    type: Number,
    enum: ReportedUserStatus.getAllStatuses(),
    default: ReportedUserStatus.PENDING,
  },
  adminNotes: { type: String },
  resolution: { type: String },
}, {
  collection: "reportedUser",
  timestamps: true,
});

reportedUserSchema.loadClass(ReportedUserClass);

const ReportedUser = mongoose.model("ReportedUser", reportedUserSchema);

export {
  ReportedUser,
  ReportedUserStatus,
  ReportedUserStatusName,
  convertReportedUserStatusNameToType,
  convertReportedUserStatusToName,
};
