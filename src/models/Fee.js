const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema(
  {
    srNo: Number,
    std: String,
    admFormFee: String,
    totalFees: Number,
    firstInstallment: Number,
    secondInstallment: Number,
    concessionBoys: Number,
    concessionGirls: Number,
    oneTimeBoys: Number,
    oneTimeGirls: Number,
    year: {
      type: String,
      default: "2025-26",
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

module.exports = mongoose.model("Fee", feeSchema);