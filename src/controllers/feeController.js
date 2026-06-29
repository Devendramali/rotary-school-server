const Fee = require("../models/Fee");
const { uploadImage, deleteImage } = require("../config/s3");

// GET ALL
exports.getAllFees = async (req, res) => {
  try {
    const data = await Fee.find().sort({ srNo: 1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE
exports.createFee = async (req, res) => {
  try {
    const {
      srNo,
      std,
      admFormFee,
      totalFees,
      firstInstallment,
      secondInstallment,
      concessionBoys,
      concessionGirls,
      oneTimeBoys,
      oneTimeGirls,
      year,
    } = req.body;

    let pdf = "";
    let pdfKey = "";

    if (req.file) {
      const upload = await uploadImage(req.file, "fees");
      pdf = upload.image;
      pdfKey = upload.imageKey;
    }

    const newFee = await Fee.create({
      srNo,
      std,
      admFormFee,
      totalFees,
      firstInstallment,
      secondInstallment,
      concessionBoys,
      concessionGirls,
      oneTimeBoys,
      oneTimeGirls,
      year,
      pdf,
      pdfKey,
    });

    res.status(201).json(newFee);
  } catch (error) {
    console.log(error); // IMPORTANT for debugging
    res.status(500).json({ error: error.message });
  }
};

// UPDATE
exports.updateFee = async (req, res) => {
  try {
    const { id } = req.params;

    const fee = await Fee.findById(id);

    if (!fee) {
      return res.status(404).json({ message: "Fee not found" });
    }

    fee.srNo = req.body.srNo;
    fee.std = req.body.std;
    fee.admFormFee = req.body.admFormFee;
    fee.totalFees = req.body.totalFees;
    fee.firstInstallment = req.body.firstInstallment;
    fee.secondInstallment = req.body.secondInstallment;
    fee.concessionBoys = req.body.concessionBoys;
    fee.concessionGirls = req.body.concessionGirls;
    fee.oneTimeBoys = req.body.oneTimeBoys;
    fee.oneTimeGirls = req.body.oneTimeGirls;
    fee.year = req.body.year;

    if (req.file) {
      if (fee.pdfKey) {
        await deleteImage(fee.pdfKey);
      }

      const upload = await uploadImage(req.file, "fees");
      fee.pdf = upload.image;
      fee.pdfKey = upload.imageKey;
    }

    await fee.save();
    res.json(fee);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// DELETE
exports.deleteFee = async (req, res) => {
  try {
    const { id } = req.params;

    const fee = await Fee.findById(id);

    if (!fee) {
      return res.status(404).json({ message: "Fee not found" });
    }

    if (fee.pdfKey) {
      await deleteImage(fee.pdfKey);
    }

    await Fee.findByIdAndDelete(id);

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// TOGGLE STATUS
exports.toggleStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const fee = await Fee.findById(id);

    if (!fee) {
      return res.status(404).json({ message: "Fee not found" });
    }

    fee.isActive = !fee.isActive;
    await fee.save();

    res.json(fee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};