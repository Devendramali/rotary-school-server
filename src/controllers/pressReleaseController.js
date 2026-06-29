const PressRelease = require("../models/PressRelease");
const { uploadImage, deleteImage } = require("../config/s3");

// CREATE
exports.createPressRelease = async (req, res) => {
  try {
    const { title, date, category, description } = req.body;

    let image = "";
    let imageKey = "";

    if (req.file) {
      const upload = await uploadImage(req.file, "press-release");
      image = upload.image;
      imageKey = upload.imageKey;
    }

    const press = await PressRelease.create({
      title,
      image,
      imageKey,
      date,
      category,
      description,
    });

    res.status(201).json({
      success: true,
      data: press,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL
exports.getPressReleases = async (req, res) => {
  try {
    const data = await PressRelease.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE
exports.getPressReleaseById = async (req, res) => {
  try {
    const data = await PressRelease.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Press release not found",
      });
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE
exports.updatePressRelease = async (req, res) => {
  try {
    const { title, date, category, description, isActive } = req.body;

    const press = await PressRelease.findById(req.params.id);

    if (!press) {
      return res.status(404).json({
        success: false,
        message: "Press release not found",
      });
    }

    let image = press.image;
    let imageKey = press.imageKey;

    if (req.file) {
      if (imageKey) {
        await deleteImage(imageKey);
      }

      const upload = await uploadImage(req.file, "press-release");
      image = upload.image;
      imageKey = upload.imageKey;
    }

    const updated = await PressRelease.findByIdAndUpdate(
      req.params.id,
      {
        title,
        date,
        category,
        description,
        image,
        imageKey,
        isActive,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE
exports.deletePressRelease = async (req, res) => {
  try {
    const press = await PressRelease.findById(req.params.id);

    if (!press) {
      return res.status(404).json({
        success: false,
        message: "Press release not found",
      });
    }

    if (press.imageKey) {
      await deleteImage(press.imageKey);
    }

    await PressRelease.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// TOGGLE STATUS
exports.togglePressReleaseStatus = async (req, res) => {
  try {
    const press = await PressRelease.findById(req.params.id);

    if (!press) {
      return res.status(404).json({
        success: false,
        message: "Press release not found",
      });
    }

    press.isActive = !press.isActive;
    await press.save();

    res.status(200).json({
      success: true,
      data: press,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};