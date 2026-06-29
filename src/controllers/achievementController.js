const Achievement = require("../models/Achievement");
const { uploadImage, deleteImage } = require("../config/s3");

// GET ALL
exports.getAllAchievements = async (req, res) => {
  try {
    const data = await Achievement.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE
exports.createAchievement = async (req, res) => {
  try {
    const {
      title,
      discription,
      position,
      name,
      category,
      level,
      rank,
      year,
      classGroup,
      eventName,
    } = req.body;

    let image = "";
    let imageKey = "";

    if (req.file) {
      const upload = await uploadImage(req.file, "achievements");
      image = upload.image;
      imageKey = upload.imageKey;
    }

    const achievement = await Achievement.create({
      title,
      position,
      discription,
      name,
      category,
      level,
      rank,
      year,
      classGroup,
      eventName,
      image,
      imageKey,
    });

    res.status(201).json(achievement);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// UPDATE
exports.updateAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);

    if (!achievement) {
      return res.status(404).json({ message: "Achievement not found" });
    }

    Object.assign(achievement, req.body);

    if (req.file) {
      if (achievement.imageKey) {
        await deleteImage(achievement.imageKey);
      }

      const upload = await uploadImage(req.file, "achievements");
      achievement.image = upload.image;
      achievement.imageKey = upload.imageKey;
    }

    await achievement.save();
    res.json(achievement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE
exports.deleteAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);

    if (!achievement) {
      return res.status(404).json({ message: "Achievement not found" });
    }

    if (achievement.imageKey) {
      await deleteImage(achievement.imageKey);
    }

    await Achievement.findByIdAndDelete(req.params.id);

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// TOGGLE
exports.toggleStatus = async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);

    if (!achievement) {
      return res.status(404).json({ message: "Achievement not found" });
    }

    achievement.isActive = !achievement.isActive;
    await achievement.save();

    res.json(achievement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};