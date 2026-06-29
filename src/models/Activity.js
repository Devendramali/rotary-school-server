const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    academicYear: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      default: "",
    },
    fileKey: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Activity", activitySchema);