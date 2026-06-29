const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  getAllNirnay,
  createNirnay,
  updateNirnay,
  deleteNirnay,
  toggleStatus,
} = require("../controllers/shashanNirnayController");

const upload = multer({ storage: multer.memoryStorage() });

router.get("/", getAllNirnay);
router.post("/", upload.single("file"), createNirnay);
router.put("/:id", upload.single("file"), updateNirnay);
router.delete("/:id", deleteNirnay);
router.put("/toggle/:id", toggleStatus);

module.exports = router;