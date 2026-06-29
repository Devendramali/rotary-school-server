const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  createTextbook,
  getTextbooks,
  getTextbooksByClass,
  getTextbookById,
  updateTextbook,
  deleteTextbook,
  toggleTextbookStatus,
} = require("../controllers/textbookController");

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post("/", upload.single("pdf"), createTextbook);
router.get("/", getTextbooks);
router.get("/class/:className", getTextbooksByClass);
router.get("/:id", getTextbookById);
router.put("/toggle/:id", toggleTextbookStatus);
router.put("/:id", upload.single("pdf"), updateTextbook);
router.delete("/:id", deleteTextbook);

module.exports = router;