const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  createManagementCommittee,
  getManagementCommittee,
  getManagementCommitteeById,
  updateManagementCommittee,
  deleteManagementCommittee,
  toggleManagementCommitteeStatus,
} = require("../controllers/managementCommitteeController");

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post("/", upload.single("image"), createManagementCommittee);
router.get("/", getManagementCommittee);
router.get("/:id", getManagementCommitteeById);
router.put("/toggle/:id", toggleManagementCommitteeStatus);
router.put("/:id", upload.single("image"), updateManagementCommittee);
router.delete("/:id", deleteManagementCommittee);

module.exports = router;