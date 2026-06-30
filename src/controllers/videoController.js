const Video = require("../models/Video");
const { uploadImage, deleteImage } = require("../config/s3");

// GET SINGLE VIDEO
exports.getVideo = async (req, res) => {
  try {
    const video = await Video.findOne();

    res.status(200).json({
      success: true,
      data: video,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// CREATE OR UPDATE SINGLE VIDEO
exports.saveVideo = async (req, res) => {
  try {
    let existing = await Video.findOne();

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Video required",
      });
    }

    if (existing && existing.videoKey) {
      await deleteImage(existing.videoKey);
    }

    const upload = await uploadImage(req.file, "videos");

    if (!existing) {
      existing = await Video.create({
        title: req.body.title || "Main Video",
        video: upload.image,
        videoKey: upload.imageKey,
      });
    } else {
      existing.title = req.body.title || existing.title;
      existing.video = upload.image;
      existing.videoKey = upload.imageKey;
      await existing.save();
    }

    res.status(200).json({
      success: true,
      data: existing,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};