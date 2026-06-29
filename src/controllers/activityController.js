const Activity = require("../models/Activity");
const { uploadImage, deleteImage } = require("../config/s3");

// CREATE
exports.createActivity = async (req, res) => {
  try {
    const { title, academicYear, category } = req.body;

    let file = "";
    let fileKey = "";

    if (req.file) {
      const upload = await uploadImage(req.file, "activities");
      file = upload.image;
      fileKey = upload.imageKey;
    }

    const activity = await Activity.create({
      title,
      academicYear,
      category,
      file,
      fileKey,
    });

    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL
exports.getActivities = async (req, res) => {
  try {
    const activities = await Activity.find().sort({ createdAt: -1 });
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE
exports.getActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
exports.updateActivity = async (req, res) => {
  try {
    const { title, academicYear, category } = req.body;

    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    let file = activity.file;
    let fileKey = activity.fileKey;

    if (req.file) {
      if (activity.fileKey) {
        await deleteImage(activity.fileKey);
      }

      const upload = await uploadImage(req.file, "activities");
      file = upload.image;
      fileKey = upload.imageKey;
    }

    activity.title = title;
    activity.academicYear = academicYear;
    activity.category = category;
    activity.file = file;
    activity.fileKey = fileKey;

    await activity.save();

    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
exports.deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    if (activity.fileKey) {
      await deleteImage(activity.fileKey);
    }

    await activity.deleteOne();

    res.status(200).json({
      message: "Activity deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// TOGGLE STATUS
exports.toggleStatus = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({
        message: "Activity not found",
      });
    }

    activity.isActive = !activity.isActive;
    await activity.save();

    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};