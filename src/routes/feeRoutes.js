const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  getAllFees,
  createFee,
  updateFee,
  deleteFee,
  toggleStatus,
} = require("../controllers/feeController");

const upload = multer({
  storage: multer.memoryStorage(),
});

router.get("/", getAllFees);
router.post("/", upload.single("pdf"), createFee);
router.put("/:id", upload.single("pdf"), updateFee);
router.delete("/:id", deleteFee);
router.put("/toggle/:id", toggleStatus);

module.exports = router;