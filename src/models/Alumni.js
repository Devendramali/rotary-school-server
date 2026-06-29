const mongoose = require("mongoose");

const alumniSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    batch: {
      type: Number,
      required: true,
    },
    profession: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
      default: "",
    },
    avatarKey: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "#2563eb",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Alumni", alumniSchema);