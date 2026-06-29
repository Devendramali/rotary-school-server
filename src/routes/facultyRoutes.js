const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  getAllFaculty,
  createFaculty,
  updateFaculty,
  deleteFaculty,
  toggleStatus,
} = require("../controllers/facultyController");

const upload = multer({
  storage: multer.memoryStorage(),
});

router.get("/", getAllFaculty);
router.post("/", upload.single("image"), createFaculty);
router.put("/:id", upload.single("image"), updateFaculty);
router.delete("/:id", deleteFaculty);
router.put("/toggle/:id", toggleStatus);

module.exports = router;