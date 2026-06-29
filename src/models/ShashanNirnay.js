const mongoose = require("mongoose");

const shashanNirnaySchema = new mongoose.Schema(
  {
    title: {
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

module.exports = mongoose.model("ShashanNirnay", shashanNirnaySchema);