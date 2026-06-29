const Alumni = require("../models/Alumni");
const { uploadImage, deleteImage } = require("../config/s3");

// CREATE
exports.createAlumni = async (req, res) => {
  try {
    const { name, batch, profession, company, color } = req.body;

    let avatar = "";
    let avatarKey = "";

    if (req.file) {
      const upload = await uploadImage(req.file, "alumni");
      avatar = upload.image;
      avatarKey = upload.imageKey;
    }

    const alumni = await Alumni.create({
      name,
      batch,
      profession,
      company,
      color,
      avatar,
      avatarKey,
    });

    res.status(201).json({
      success: true,
      data: alumni,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL
exports.getAlumni = async (req, res) => {
  try {
    const alumni = await Alumni.find().sort({ batch: 1 });

    res.status(200).json({
      success: true,
      data: alumni,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE
exports.getAlumniById = async (req, res) => {
  try {
    const alumni = await Alumni.findById(req.params.id);

    if (!alumni) {
      return res.status(404).json({
        success: false,
        message: "Alumni not found",
      });
    }

    res.status(200).json({
      success: true,
      data: alumni,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE
exports.updateAlumni = async (req, res) => {
  try {
    const { name, batch, profession, company, color, isActive } = req.body;

    const alumni = await Alumni.findById(req.params.id);

    if (!alumni) {
      return res.status(404).json({
        success: false,
        message: "Alumni not found",
      });
    }

    let avatar = alumni.avatar;
    let avatarKey = alumni.avatarKey;

    if (req.file) {
      if (avatarKey) {
        await deleteImage(avatarKey);
      }

      const upload = await uploadImage(req.file, "alumni");
      avatar = upload.image;
      avatarKey = upload.imageKey;
    }

    const updated = await Alumni.findByIdAndUpdate(
      req.params.id,
      {
        name,
        batch,
        profession,
        company,
        color,
        avatar,
        avatarKey,
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
exports.deleteAlumni = async (req, res) => {
  try {
    const alumni = await Alumni.findById(req.params.id);

    if (!alumni) {
      return res.status(404).json({
        success: false,
        message: "Alumni not found",
      });
    }

    if (alumni.avatarKey) {
      await deleteImage(alumni.avatarKey);
    }

    await Alumni.findByIdAndDelete(req.params.id);

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

// TOGGLE
exports.toggleAlumniStatus = async (req, res) => {
  try {
    const alumni = await Alumni.findById(req.params.id);

    if (!alumni) {
      return res.status(404).json({
        success: false,
        message: "Alumni not found",
      });
    }

    alumni.isActive = !alumni.isActive;
    await alumni.save();

    res.status(200).json({
      success: true,
      data: alumni,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};