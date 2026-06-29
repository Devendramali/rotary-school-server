const express = require("express");
const router = express.Router();

const {
  saveStudentStrength,
  getStudentStrength,
} = require("../controllers/studentStrengthController");

router.get("/", getStudentStrength);
router.post("/", saveStudentStrength);

module.exports = router;