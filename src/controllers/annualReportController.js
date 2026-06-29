const AnnualReport = require("../models/AnnualReport");
const { uploadImage, deleteImage } = require("../config/s3");

// CREATE
exports.createAnnualReport = async (req, res) => {
  try {
    const { year, title, classes, classRange, desc, isLatest } = req.body;

    let pdf = "";
    let pdfKey = "";

    if (req.file) {
      const upload = await uploadImage(req.file, "annual-reports");
      pdf = upload.image;
      pdfKey = upload.imageKey;
    }

    if (isLatest === "true" || isLatest === true) {
      await AnnualReport.updateMany({}, { isLatest: false });
    }

    const report = await AnnualReport.create({
      year,
      title,
      classes,
      classRange,
      desc,
      pdf,
      pdfKey,
      isLatest,
    });

    res.status(201).json({
      success: true,
      data: report,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL
exports.getAnnualReports = async (req, res) => {
  try {
    const reports = await AnnualReport.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: reports,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE
exports.getAnnualReportById = async (req, res) => {
  try {
    const report = await AnnualReport.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    res.status(200).json({
      success: true,
      data: report,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE
exports.updateAnnualReport = async (req, res) => {
  try {
    const { year, title, classes, classRange, desc, isLatest, isActive } =
      req.body;

    const report = await AnnualReport.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    let pdf = report.pdf;
    let pdfKey = report.pdfKey;

    if (req.file) {
      if (pdfKey) await deleteImage(pdfKey);

      const upload = await uploadImage(req.file, "annual-reports");
      pdf = upload.image;
      pdfKey = upload.imageKey;
    }

    if (isLatest === "true" || isLatest === true) {
      await AnnualReport.updateMany({}, { isLatest: false });
    }

    const updated = await AnnualReport.findByIdAndUpdate(
      req.params.id,
      {
        year,
        title,
        classes,
        classRange,
        desc,
        pdf,
        pdfKey,
        isLatest,
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
exports.deleteAnnualReport = async (req, res) => {
  try {
    const report = await AnnualReport.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    if (report.pdfKey) await deleteImage(report.pdfKey);

    await AnnualReport.findByIdAndDelete(req.params.id);

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
exports.toggleAnnualReportStatus = async (req, res) => {
  try {
    const report = await AnnualReport.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    report.isActive = !report.isActive;
    await report.save();

    res.status(200).json({
      success: true,
      data: report,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};