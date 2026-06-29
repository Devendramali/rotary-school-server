const Faculty = require("../models/Faculty");
const { uploadImage, deleteImage } = require("../config/s3");

// GET ALL
exports.getAllFaculty = async (req, res) => {
  try {
    const data = await Faculty.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE
exports.createFaculty = async (req, res) => {
  try {
    const { name, designation, department, qualification, bio } = req.body;

    let image = "";
    let imageKey = "";

    if (req.file) {
      const upload = await uploadImage(req.file, "faculty");
      image = upload.image;
      imageKey = upload.imageKey;
    }

    const faculty = await Faculty.create({
      name,
      designation,
      department,
      qualification,
      bio,
      image,
      imageKey,
    });

    res.status(201).json(faculty);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// UPDATE
exports.updateFaculty = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, designation, department, qualification, bio } = req.body;

    const faculty = await Faculty.findById(id);

    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    faculty.name = name;
    faculty.designation = designation;
    faculty.department = department;
    faculty.qualification = qualification;
    faculty.bio = bio;

    if (req.file) {
      if (faculty.imageKey) {
        await deleteImage(faculty.imageKey);
      }

      const upload = await uploadImage(req.file, "faculty");
      faculty.image = upload.image;
      faculty.imageKey = upload.imageKey;
    }

    await faculty.save();

    res.json(faculty);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// DELETE
exports.deleteFaculty = async (req, res) => {
  try {
    const { id } = req.params;

    const faculty = await Faculty.findById(id);

    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    if (faculty.imageKey) {
      await deleteImage(faculty.imageKey);
    }

    await Faculty.findByIdAndDelete(id);

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// TOGGLE STATUS
exports.toggleStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const faculty = await Faculty.findById(id);

    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    faculty.isActive = !faculty.isActive;
    await faculty.save();

    res.json(faculty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};