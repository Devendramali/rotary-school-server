const mongoose = require("mongoose");

const classStrengthSchema = new mongoose.Schema(
  {
    className: {
      type: String,
      required: true,
      enum: [
        "Class I",
        "Class II",
        "Class III",
        "Class IV",
        "Class V",
        "Class VI",
        "Class VII",
        "Class VIII",
        "Class IX",
        "Class X",
      ],
    },
    students: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { _id: false }
);

const studentStrengthSchema = new mongoose.Schema(
  {
    totalStudents: {
      type: Number,
      default: 0,
    },
    girlsStudents: {
      type: Number,
      default: 0,
    },
    qualifiedTeachers: {
      type: Number,
      default: 0,
    },
    classStrength: {
      type: [classStrengthSchema],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "StudentStrength",
  studentStrengthSchema
);