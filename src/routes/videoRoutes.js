const express = require("express");
const router = express.Router();
const multer = require("multer");

const { getVideo, saveVideo } = require("../controllers/videoController");

const upload = multer({
  storage: multer.memoryStorage(),
});

router.get("/", getVideo);
router.post("/", upload.single("video"), saveVideo);

module.exports = router;