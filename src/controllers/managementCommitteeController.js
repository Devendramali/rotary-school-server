const ManagementCommittee = require("../models/ManagementCommittee");
const { uploadImage, deleteImage } = require("../config/s3");

// CREATE
exports.createManagementCommittee = async (req, res) => {
  try {
    const {
      name,
      designation,
      occupation,
      occupationAddress,
      mobile1,
      mobile2,
    } = req.body;

    let image = "";
    let imageKey = "";

    if (req.file) {
      const upload = await uploadImage(req.file, "management-committee");
      image = upload.image;
      imageKey = upload.imageKey;
    }

    const data = await ManagementCommittee.create({
      name,
      designation,
      image,
      imageKey,
      occupation,
      occupationAddress,
      mobile1,
      mobile2,
    });

    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL
exports.getManagementCommittee = async (req, res) => {
  try {
    const data = await ManagementCommittee.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE
exports.getManagementCommitteeById = async (req, res) => {
  try {
    const data = await ManagementCommittee.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE
exports.updateManagementCommittee = async (req, res) => {
  try {
    const {
      name,
      designation,
      occupation,
      occupationAddress,
      mobile1,
      mobile2,
      isActive,
    } = req.body;

    const member = await ManagementCommittee.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    let image = member.image;
    let imageKey = member.imageKey;

    if (req.file) {
      if (imageKey) {
        await deleteImage(imageKey);
      }

      const upload = await uploadImage(req.file, "management-committee");
      image = upload.image;
      imageKey = upload.imageKey;
    }

    const updated = await ManagementCommittee.findByIdAndUpdate(
      req.params.id,
      {
        name,
        designation,
        image,
        imageKey,
        occupation,
        occupationAddress,
        mobile1,
        mobile2,
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
exports.deleteManagementCommittee = async (req, res) => {
  try {
    const member = await ManagementCommittee.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    if (member.imageKey) {
      await deleteImage(member.imageKey);
    }

    await ManagementCommittee.findByIdAndDelete(req.params.id);

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
exports.toggleManagementCommitteeStatus = async (req, res) => {
  try {
    const member = await ManagementCommittee.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    member.isActive = !member.isActive;
    await member.save();

    res.status(200).json({
      success: true,
      data: member,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};