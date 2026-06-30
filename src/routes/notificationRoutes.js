const express = require("express");
const router = express.Router();

const {
  createNotification,
  getNotifications,
  getNotificationById,
  updateNotification,
  deleteNotification,
  toggleNotificationStatus,
} = require("../controllers/notificationController");

router.post("/", createNotification);
router.get("/", getNotifications);
router.get("/:id", getNotificationById);
router.put("/toggle/:id", toggleNotificationStatus);
router.put("/:id", updateNotification);
router.delete("/:id", deleteNotification);

module.exports = router;