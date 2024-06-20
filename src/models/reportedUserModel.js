import mongoose from "mongoose";

class ReportedUserStatus {
  constructor() {}

  static PENDING = 1000;
  static RESOLVED = 1001;
  static REJECTED = 1002;

  static getAllReportedUserStatuses() {
    return [this.PENDING, this.RESOLVED, this.REJECTED];
  }
}

class ReportedUserStatusName {
  constructor() {}

  static PENDING = "PENDING";
  static RESOLVED = "RESOLVED";
  static REJECTED = "REJECTED";

  static getAllReportedUserStatusNames() {
    return [this.PENDING, this.RESOLVED, this.REJECTED];
  }
}

const convertReportedUserStatusToName = (status) => {
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

const convertReportedUserStatusNameToType = (statusName) => {
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
  }) {
    this.userId = userId;
    this.reporterId = reporterId;
    this.reason = reason;
    this.description = description;
    this.reportedTime = reportedTime;
    this.status = status;
    this.adminNotes = adminNotes;
  }

  static schema = {
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
      enum: ReportedUserStatus.getAllReportedUserStatuses(),
      default: ReportedUserStatus.PENDING,
    },
    adminNotes: { type: String },
    resolution: { type: String },
  };

  serialize() {
    return {
      id: this._id.toString(),
      userId: this.userId.toString(),
      reporterId: this.reporterId.toString(),
      reason: this.reason,
      description: this.description,
      reportedTime: this.reportedTime,
      status: convertReportedUserStatusToName(this.status),
      adminNotes: this.adminNotes,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

const reportedUserSchema = new mongoose.Schema(ReportedUserClass.schema, {
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
