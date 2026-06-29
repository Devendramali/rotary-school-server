const mongoose = require("mongoose");

const presidentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    presidentName: { type: String, required: true },
    designation: { type: String, default: "President" },
    image: { type: String, default: "" },
    imageKey: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("President", presidentSchema);