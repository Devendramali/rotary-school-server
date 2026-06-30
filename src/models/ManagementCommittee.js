const mongoose = require("mongoose");

const managementCommitteeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    imageKey: {
      type: String,
      default: "",
    },
    occupation: {
      type: String,
      default: "",
    },
    occupationAddress: {
      type: String,
      default: "",
    },
    mobile1: {
      type: String,
      required: true,
    },
    mobile2: {
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

module.exports = mongoose.model(
  "ManagementCommittee",
  managementCommitteeSchema
);