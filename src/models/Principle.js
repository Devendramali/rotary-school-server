const mongoose = require("mongoose");

const principleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    principleName: { type: String, required: true },
    designation: { type: String, default: "Principle" },
    image: { type: String, default: "" },
    imageKey: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Principle", principleSchema);