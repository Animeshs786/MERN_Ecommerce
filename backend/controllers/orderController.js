const Order = require("../models/orderModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.createOrder = catchAsync(async (req, res, next) => {
  req.body.user = req.body.user || req.user.id;
  req.body.product = req.body.product || req.params.id;

  const newOrder = await Order.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      order: newOrder,
    },
  });
});

exports.getAllOrder = catchAsync(async (req, res, next) => {
  const filter = {};
  if (req.params.id) filter.product = req.params.id;

  const order = await Order.find(filter);

  res.status(200).json({
    status: "success",
    result: order?.length,
    data: {
      order,
    },
  });
});

exports.getOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new AppError(`Order not exist for Id: ${req.params.id}`, 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      order,
    },
  });
});

exports.updateOrder = catchAsync(async (req, res, next) => {
  const { paymentStatus, orderStatus } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new AppError(`Order not exist for Id: ${req.params.id}`, 404));
  }

  order.paymentStatus = paymentStatus;
  order.orderStatus = orderStatus;

  await order.save();

  res.status(200).json({
    status: "success",
    data: {
      order,
    },
  });
});

exports.deleteOrder = catchAsync(async (req, res, next) => {
  await Order.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Order delete successfully",
  });
});



exports.getMyOrder = (req, res, next) => {
  req.params.userId = req.user.id;
  next();
};

exports.getUserOrder = catchAsync(async (req, res, next) => {
  const order = await Order.find({ user: req.params.userId });
 
  res.status(200).json({
    status: "success",
    result: order.length,
    data: {
      order,
    },
  });
});
