const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    discription: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    rank: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    classGroup: {
      type: String,
      required: true,
    },
    eventName: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    imageKey: {
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

module.exports = mongoose.model("Achievement", achievementSchema);