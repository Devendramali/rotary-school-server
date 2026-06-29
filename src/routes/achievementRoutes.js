const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  getAllAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement,
  toggleStatus,
} = require("../controllers/achievementController");

const upload = multer({
  storage: multer.memoryStorage(),
});

router.get("/", getAllAchievements);
router.post("/", upload.single("image"), createAchievement);
router.put("/:id", upload.single("image"), updateAchievement);
router.delete("/:id", deleteAchievement);
router.put("/toggle/:id", toggleStatus);

module.exports = router;