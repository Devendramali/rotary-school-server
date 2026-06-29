const StudentStrength = require("../models/StudentStrength");

// SAVE / UPDATE
exports.saveStudentStrength = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const {
      totalStudents,
      girlsStudents,
      qualifiedTeachers,
      classStrength,
    } = req.body;

    const payload = {
      totalStudents: Number(totalStudents) || 0,
      girlsStudents: Number(girlsStudents) || 0,
      qualifiedTeachers: Number(qualifiedTeachers) || 0,
      classStrength: (classStrength || []).map((item) => ({
        className: item.className,
        students: Number(item.students) || 0,
      })),
    };

    let existing = await StudentStrength.findOne();

    let data;

    if (existing) {
      data = await StudentStrength.findByIdAndUpdate(
        existing._id,
        payload,
        { new: true }
      );
    } else {
      data = await StudentStrength.create(payload);
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log("SAVE ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET
exports.getStudentStrength = async (req, res) => {
  try {
    const data = await StudentStrength.findOne();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log("GET ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};