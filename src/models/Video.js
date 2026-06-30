const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Main Video",
    },
    video: {
      type: String,
      default: "",
    },
    videoKey: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", videoSchema);