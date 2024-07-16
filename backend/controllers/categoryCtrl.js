const Category = require("../model/Category");
const Transaction = require("../model/Transaction");
const asyncHandler = require("express-async-handler");

const categoryController = {
  // ! add
  create: asyncHandler(async (req, res) => {
    const { name, type } = req.body;

    if (!name || !type) {
      throw new Error("Name and type are required to create category");
    }
    // ? convert the name to lowercase
    const normalizedName = name.toLowerCase();

    // * check if type is valid
    const validTypes = ["income", "expense"];
    if (!validTypes.includes(type.toLowerCase())) {
      throw new Error("Invalid vategory type" + type);
    }

    // * check if category exists
    const categoryExists = await Category.findOne({
      name: normalizedName,
      user: req.userId,
    });

    if (categoryExists) {
      throw new Error(
        `category ${categoryExists.name} already exists in the database`
      );
    }

    const category = await Category.create({
      name: normalizedName,
      user: req.userId,
      type,
    });
    res.status(201).json({
      message: "category created",
      data: category,
      success: true,
      error: false,
    });
  }),

  // ! list the categories
  lists: asyncHandler(async (req, res) => {
    const categories = await Category.find({ user: req.userId });
    res.status(200).json({
      message: "All categories",
      data: categories,
      success: true,
      error: false,
    });
  }),

  // ! Update the category
  update: asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    console.log("categoryId", categoryId);
    const { name, type } = req.body;
    const normalizedName = name.toLowerCase();
    const category = await Category.findById(categoryId);
    if (!category || category.user.toString() !== req.userId.toString()) {
      throw new Error("Category not found or User not authorised");
    }

    const oldName = category.name;
    category.name = normalizedName || category.name;
    category.type = type || category.type;
    const updatedCategory = await category.save();
    // ? update affected transaction
    if (oldName !== updatedCategory.name) {
      await Transaction.updateMany(
        {
          user: req.userId,
          category: oldName,
        },
        {
          $set: {
            category: updatedCategory.name,
          },
        }
      );
    }
    res.status(200).json({
      message: "Category updated",
      data: updatedCategory,
    });
  }),

  //   ! Delete the category
  delete: asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (category && category.user.toString() === req.userId.toString()) {
      // * update transactions that have this category
      const defaultCategory = "Uncategorized";
      await Transaction.updateMany(
        {
          user: req.userId,
          category: category.name,
        },
        {
          $set: { category: defaultCategory },
        }
      );

      // ? remove category
      await Category.findByIdAndDelete(req.params.id);
      res.json({
        message: "Category removed and transactions updated",
      });
    } else {
      res.json({
        message: "Category not found",
      });
    }
  }),
};

module.exports = categoryController;
