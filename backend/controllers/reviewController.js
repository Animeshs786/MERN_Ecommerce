const Review = require("../models/reviewModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.createReview = catchAsync(async (req, res, next) => {
  req.body.user = req.body.user || req.user.id;
  req.body.product = req.body.product || req.params.id;

  const existed = await Review.findOne({
    user: req.body.user,
    product: req.body.product,
  });

  let review;

  if (existed) {
    existed.rating = req.body.rating;
    existed.review = req.body.review;
    review = await existed.save();
  } else {
    review = await Review.create(req.body);
  }

  res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});

exports.getAllReview = catchAsync(async (req, res, next) => {
  const filter = {};
  if (req.params.id) filter.product = req.params.id;

  const review = await Review.find(filter).sort("-createdAt");

  res.status(200).json({
    status: "success",
    result: review?.length,
    data: {
      review,
    },
  });
});

exports.getReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(new AppError(`Review not exist for Id: ${req.params.id}`, 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!review) {
    return next(new AppError(`Review not exist for Id: ${req.params.id}`, 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  await Review.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Review delete successfully.",
  });
});
