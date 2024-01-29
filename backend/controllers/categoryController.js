const Category = require("../models/categoryModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.createCategory = catchAsync(async (req, res, next) => {
  // req.body.user = req.body.user || req.user.id;
  req.body.user = "6576be7a8d7fa310d22e1b4c";
  const newCategory = await Category.create(req.body);

  res.status(200).json({
    status: "success",
    data: {
      category: newCategory,
    },
  });
});

exports.getAllCategory = catchAsync(async (req, res, next) => {
  const category = await Category.find();

  res.status(200).json({
    status: "success",
    result: category?.length,
    data: {
      category,
    },
  });
});

exports.getCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(
      new AppError(`Category not exit for Id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    status: "success",
    data: {
      category,
    },
  });
});

exports.updateCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!category) {
    return next(
      new AppError(`Category not exit for Id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    status: "success",
    data: {
      category,
    },
  });
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
  await Category.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Category remove successfully.",
  });
});
