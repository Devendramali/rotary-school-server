const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const {
  createPrinciple,
  getPrinciple,
  updatePrinciple,
  deletePrinciple,
  togglePrincipleStatus,
} = require("../controllers/principleController");

router.get("/", getPrinciple);
router.post("/", upload.single("image"), createPrinciple);
router.put("/:id", upload.single("image"), updatePrinciple);
router.delete("/:id", deletePrinciple);
router.put("/toggle/:id", togglePrincipleStatus);

module.exports = router;