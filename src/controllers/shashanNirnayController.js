const ShashanNirnay = require("../models/ShashanNirnay");
const { uploadImage, deleteImage } = require("../config/s3");


// GET ALL
exports.getAllNirnay = async (req, res) => {
  try {
    const data = await ShashanNirnay.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// CREATE
exports.createNirnay = async (req, res) => {
  try {
    const { title } = req.body;

    let file = "";
    let fileKey = "";

    if (req.file) {
      const upload = await uploadImage(req.file, "shashan-nirnay");
      file = upload.image;
      fileKey = upload.imageKey;
    }

    const newItem = await ShashanNirnay.create({
      title,
      file,
      fileKey,
    });

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// UPDATE
exports.updateNirnay = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const item = await ShashanNirnay.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Not found" });
    }

    item.title = title;

    if (req.file) {
      if (item.fileKey) {
        await deleteImage(item.fileKey);
      }

      const upload = await uploadImage(req.file, "shashan-nirnay");
      item.file = upload.image;
      item.fileKey = upload.imageKey;
    }

    await item.save();

    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// DELETE
exports.deleteNirnay = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await ShashanNirnay.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Not found" });
    }

    if (item.fileKey) {
      await deleteImage(item.fileKey);
    }

    await ShashanNirnay.findByIdAndDelete(id);

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// TOGGLE STATUS
exports.toggleStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await ShashanNirnay.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Not found" });
    }

    item.isActive = !item.isActive;
    await item.save();

    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};