const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  createAlumni,
  getAlumni,
  getAlumniById,
  updateAlumni,
  deleteAlumni,
  toggleAlumniStatus,
} = require("../controllers/alumniController");

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post("/", upload.single("avatar"), createAlumni);
router.get("/", getAlumni);
router.get("/:id", getAlumniById);
router.put("/toggle/:id", toggleAlumniStatus);
router.put("/:id", upload.single("avatar"), updateAlumni);
router.delete("/:id", deleteAlumni);

module.exports = router;