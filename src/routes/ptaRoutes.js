const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  getAllPTA,
  createPTA,
  updatePTA,
  deletePTA,
  toggleStatus,
} = require("../controllers/ptaController");

const upload = multer({
  storage: multer.memoryStorage(),
});

router.get("/", getAllPTA);
router.post("/", upload.single("image"), createPTA);
router.put("/:id", upload.single("image"), updatePTA);
router.delete("/:id", deletePTA);
router.put("/toggle/:id", toggleStatus);

module.exports = router;