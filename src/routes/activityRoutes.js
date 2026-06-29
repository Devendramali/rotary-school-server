const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const {
  createActivity,
  getActivities,
  getActivity,
  updateActivity,
  deleteActivity,
  toggleStatus,
} = require("../controllers/activityController");

router.post("/", upload.single("file"), createActivity);
router.put("/toggle/:id", toggleStatus);
router.get("/", getActivities);
router.get("/:id", getActivity);
router.put("/:id", upload.single("file"), updateActivity);
router.delete("/:id", deleteActivity);

module.exports = router;