const mongoose = require("mongoose");

const annualReportSchema = new mongoose.Schema(
  {
    year: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: "Annual Report",
    },
    classes: {
      type: String,
      required: true,
      enum: ["Primary", "Upper Primary", "Secondary"],
    },
    classRange: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      default: "",
    },
    pdf: {
      type: String,
      default: "",
    },
    pdfKey: {
      type: String,
      default: "",
    },
    isLatest: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AnnualReport", annualReportSchema);