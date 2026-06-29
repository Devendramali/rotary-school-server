const ActivityCategory = require("../models/ActivityCategory");

// CREATE
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const exists = await ActivityCategory.findOne({ name });

    if (exists) {
      return res.status(400).json({
        message: "Category already exists",
      });
    }

    const category = await ActivityCategory.create({ name });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL
exports.getCategories = async (req, res) => {
  try {
    const categories = await ActivityCategory.find().sort({
      createdAt: -1,
    });

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE
exports.deleteCategory = async (req, res) => {
  try {
    const category = await ActivityCategory.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    await category.deleteOne();

    res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// TOGGLE STATUS
exports.toggleCategory = async (req, res) => {
  try {
    const category = await ActivityCategory.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    category.isActive = !category.isActive;
    await category.save();

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};