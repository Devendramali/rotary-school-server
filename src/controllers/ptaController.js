const PTA = require("../models/PTA");
const { uploadImage, deleteImage } = require("../config/s3");

// GET ALL
exports.getAllPTA = async (req, res) => {
  try {
    const data = await PTA.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE
exports.createPTA = async (req, res) => {
  try {
    const { title, subtitle, description } = req.body;

    let image = "";
    let imageKey = "";

    if (req.file) {
      const upload = await uploadImage(req.file, "pta");
      image = upload.image;
      imageKey = upload.imageKey;
    }

    const pta = await PTA.create({
      title,
      subtitle,
      description,
      image,
      imageKey,
    });

    res.status(201).json(pta);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// UPDATE
exports.updatePTA = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, description } = req.body;

    const pta = await PTA.findById(id);

    if (!pta) {
      return res.status(404).json({ message: "PTA not found" });
    }

    pta.title = title;
    pta.subtitle = subtitle;
    pta.description = description;

    if (req.file) {
      if (pta.imageKey) {
        await deleteImage(pta.imageKey);
      }

      const upload = await uploadImage(req.file, "pta");
      pta.image = upload.image;
      pta.imageKey = upload.imageKey;
    }

    await pta.save();
    res.json(pta);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// DELETE
exports.deletePTA = async (req, res) => {
  try {
    const { id } = req.params;

    const pta = await PTA.findById(id);

    if (!pta) {
      return res.status(404).json({ message: "PTA not found" });
    }

    if (pta.imageKey) {
      await deleteImage(pta.imageKey);
    }

    await PTA.findByIdAndDelete(id);

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// TOGGLE STATUS
exports.toggleStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const pta = await PTA.findById(id);

    if (!pta) {
      return res.status(404).json({ message: "PTA not found" });
    }

    pta.isActive = !pta.isActive;
    await pta.save();

    res.json(pta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};