const mongoose = require("mongoose");

const textbookSchema = new mongoose.Schema(
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
    subjectName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    publisherName: {
      type: String,
      required: true,
    },
    pdf: {
      type: String,
      default: "",
    },
    pdfKey: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Textbook", textbookSchema);