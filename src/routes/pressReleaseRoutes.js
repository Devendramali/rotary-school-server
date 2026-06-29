const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  createPressRelease,
  getPressReleases,
  getPressReleaseById,
  updatePressRelease,
  deletePressRelease,
  togglePressReleaseStatus,
} = require("../controllers/pressReleaseController");

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post("/", upload.single("image"), createPressRelease);
router.get("/", getPressReleases);
router.get("/:id", getPressReleaseById);
router.put("/toggle/:id", togglePressReleaseStatus);
router.put("/:id", upload.single("image"), updatePressRelease);
router.delete("/:id", deletePressRelease);

module.exports = router;