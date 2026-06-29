const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  createAnnualReport,
  getAnnualReports,
  getAnnualReportById,
  updateAnnualReport,
  deleteAnnualReport,
  toggleAnnualReportStatus,
} = require("../controllers/annualReportController");

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post("/", upload.single("pdf"), createAnnualReport);
router.get("/", getAnnualReports);
router.get("/:id", getAnnualReportById);
router.put("/toggle/:id", toggleAnnualReportStatus);
router.put("/:id", upload.single("pdf"), updateAnnualReport);
router.delete("/:id", deleteAnnualReport);

module.exports = router;