const President = require("../models/President");
const { uploadImage, deleteImage } = require("../config/s3");

// CREATE
exports.createPresident = async (req, res) => {
  try {
    const { title, message, presidentName, designation } = req.body;

    let image = "";
    let imageKey = "";

    if (req.file) {
      const upload = await uploadImage(req.file, "president");
      image = upload.image;
      imageKey = upload.imageKey;
    }

    const president = await President.create({
      title,
      message,
      presidentName,
      designation,
      image,
      imageKey,
      isActive: true,
    });

    res.status(201).json(president);
} catch (err) {
  console.error("UPDATE PRESIDENT ERROR:");
  console.error(err);
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}
};

// READ
exports.getPresident = async (req, res) => {
  try {
    const president = await President.find().sort({ createdAt: -1 });
    res.json(president);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
exports.updatePresident = async (req, res) => {
  try {
    console.log("========== UPDATE PRESIDENT ==========");
    console.log("ID:", req.params.id);
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const president = await President.findById(req.params.id);
    console.log("FOUND:", president);

    if (!president) {
      return res.status(404).json({ message: "Not found" });
    }

    if (req.file) {
      console.log("Uploading new image...");

      if (president.imageKey) {
        console.log("Deleting old image:", president.imageKey);
        await deleteImage(president.imageKey);
      }

      const upload = await uploadImage(req.file, "president");
      console.log("UPLOAD RESULT:", upload);

      president.image = upload.image;
      president.imageKey = upload.imageKey;
    }

    president.title = req.body.title;
    president.message = req.body.message;
    president.presidentName = req.body.presidentName;
    president.designation = req.body.designation;

    await president.save();

    console.log("SAVE SUCCESS");
    res.json(president);
  } catch (err) {
    console.log("ERROR NAME:", err.name);
    console.log("ERROR MESSAGE:", err.message);
    console.log("FULL ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// DELETE
exports.deletePresident = async (req, res) => {
  try {
    const president = await President.findById(req.params.id);

    if (!president) {
      return res.status(404).json({ message: "Not found" });
    }

    if (president.imageKey) {
      await deleteImage(president.imageKey);
    }

    await president.deleteOne();

    res.json({ message: "President deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// TOGGLE
exports.togglePresidentStatus = async (req, res) => {
  try {
    const president = await President.findById(req.params.id);

    if (!president) {
      return res.status(404).json({ message: "Not found" });
    }

    president.isActive = !president.isActive;
    await president.save();

    res.json(president);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};