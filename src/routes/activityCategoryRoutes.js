const express = require("express");
const router = express.Router();

const {
  createCategory,
  getCategories,
  deleteCategory,
  toggleCategory,
} = require("../controllers/activityCategoryController");

router.post("/", createCategory);
router.get("/", getCategories);
router.delete("/:id", deleteCategory);
router.put("/toggle/:id", toggleCategory);

module.exports = router;