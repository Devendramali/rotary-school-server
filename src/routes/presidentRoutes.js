const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const {
  createPresident,
  getPresident,
  updatePresident,
  deletePresident,
  togglePresidentStatus,
} = require("../controllers/presidentController");

router.get("/", getPresident);
router.post("/", upload.single("image"), createPresident);
router.put("/:id", upload.single("image"), updatePresident);
router.delete("/:id", deletePresident);
router.put("/toggle/:id", togglePresidentStatus);

module.exports = router;