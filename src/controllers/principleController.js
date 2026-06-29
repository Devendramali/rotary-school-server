const Principle = require("../models/Principle");
const { uploadImage, deleteImage } = require("../config/s3");

// CREATE
exports.createPrinciple = async (req, res) => {
  try {
    const { title, message, principleName, designation } = req.body;

    let image = "";
    let imageKey = "";

    if (req.file) {
      const upload = await uploadImage(req.file, "principle");
      image = upload.image;
      imageKey = upload.imageKey;
    }

    const principle = await Principle.create({
      title,
      message,
      principleName,
      designation,
      image,
      imageKey,
      isActive: true,
    });

    res.status(201).json(principle);
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
exports.getPrinciple = async (req, res) => {
  try {
    const principle = await Principle.find().sort({ createdAt: -1 });
    res.json(principle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
exports.updatePrinciple = async (req, res) => {
  try {
    console.log("========== UPDATE PRESIDENT ==========");
    console.log("ID:", req.params.id);
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const principle = await Principle.findById(req.params.id);
    console.log("FOUND:", principle);

    if (!principle) {
      return res.status(404).json({ message: "Not found" });
    }

    if (req.file) {
      console.log("Uploading new image...");

      if (principle.imageKey) {
        console.log("Deleting old image:", principle.imageKey);
        await deleteImage(principle.imageKey);
      }

      const upload = await uploadImage(req.file, "principle");
      console.log("UPLOAD RESULT:", upload);

      principle.image = upload.image;
      principle.imageKey = upload.imageKey;
    }

    principle.title = req.body.title;
    principle.message = req.body.message;
    principle.principleName = req.body.principleName;
    principle.designation = req.body.designation;

    await principle.save();

    console.log("SAVE SUCCESS");
    res.json(principle);
  } catch (err) {
    console.log("ERROR NAME:", err.name);
    console.log("ERROR MESSAGE:", err.message);
    console.log("FULL ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// DELETE
exports.deletePrinciple = async (req, res) => {
  try {
    const principle = await Principle.findById(req.params.id);

    if (!principle) {
      return res.status(404).json({ message: "Not found" });
    }

    if (principle.imageKey) {
      await deleteImage(principle.imageKey);
    }

    await principle.deleteOne();

    res.json({ message: "Principle deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// TOGGLE
exports.togglePrincipleStatus = async (req, res) => {
  try {
    const principle = await Principle.findById(req.params.id);

    if (!principle) {
      return res.status(404).json({ message: "Not found" });
    }

    principle.isActive = !principle.isActive;
    await principle.save();

    res.json(principle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};