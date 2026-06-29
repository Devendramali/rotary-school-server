const Textbook = require("../models/Textbook");
const { uploadImage, deleteImage } = require("../config/s3");

// CREATE
exports.createTextbook = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { className, subjectName, description, publisherName } = req.body;

    let pdf = "";
    let pdfKey = "";

    if (req.file) {
      const upload = await uploadImage(req.file, "textbooks");
      console.log("UPLOAD:", upload);

      pdf = upload.image;
      pdfKey = upload.imageKey;
    }

    const textbook = await Textbook.create({
      className,
      subjectName,
      description,
      publisherName,
      pdf,
      pdfKey,
    });

    res.status(201).json({
      success: true,
      data: textbook,
    });
  } catch (error) {
    console.log("CREATE ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL
exports.getTextbooks = async (req, res) => {
  try {
    const textbooks = await Textbook.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: textbooks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET BY CLASS
exports.getTextbooksByClass = async (req, res) => {
  try {
    const textbooks = await Textbook.find({
      className: req.params.className,
      isActive: true,
    });

    res.status(200).json({
      success: true,
      data: textbooks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE
exports.getTextbookById = async (req, res) => {
  try {
    const textbook = await Textbook.findById(req.params.id);

    if (!textbook) {
      return res.status(404).json({
        success: false,
        message: "Textbook not found",
      });
    }

    res.status(200).json({
      success: true,
      data: textbook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE
exports.updateTextbook = async (req, res) => {
  try {
    const { className, subjectName, description, publisherName, isActive } =
      req.body;

    const textbook = await Textbook.findById(req.params.id);

    if (!textbook) {
      return res.status(404).json({
        success: false,
        message: "Textbook not found",
      });
    }

    let pdf = textbook.pdf;
    let pdfKey = textbook.pdfKey;

    if (req.file) {
      if (pdfKey) {
        await deleteImage(pdfKey);
      }

      const upload = await uploadImage(req.file, "textbooks");
      pdf = upload.image;
      pdfKey = upload.imageKey;
    }

    const updated = await Textbook.findByIdAndUpdate(
      req.params.id,
      {
        className,
        subjectName,
        description,
        publisherName,
        pdf,
        pdfKey,
        isActive,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE
exports.deleteTextbook = async (req, res) => {
  try {
    const textbook = await Textbook.findById(req.params.id);

    if (!textbook) {
      return res.status(404).json({
        success: false,
        message: "Textbook not found",
      });
    }

    if (textbook.pdfKey) {
      await deleteImage(textbook.pdfKey);
    }

    await Textbook.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// TOGGLE
exports.toggleTextbookStatus = async (req, res) => {
  try {
    const textbook = await Textbook.findById(req.params.id);

    if (!textbook) {
      return res.status(404).json({
        success: false,
        message: "Textbook not found",
      });
    }

    textbook.isActive = !textbook.isActive;
    await textbook.save();

    res.status(200).json({
      success: true,
      data: textbook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};