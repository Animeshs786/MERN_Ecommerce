const multer = require("multer");
const sharp = require("sharp");

const Product = require("../models/productModel");
const AppError = require("../utils/AppError");
const AppFeactures = require("../utils/AppFeactures");
const catchAsync = require("../utils/catchAsync");

const multerStorage = multer.memoryStorage();

const multerFilter = function (req, file, cb) {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Only image should be uploaded.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadProductPhoto = upload.fields([
  { name: "images", maxCount: 5 },
  { name: "thumbImage", maxCount: 1 },
]);

exports.resizeProductPhoto = catchAsync(async (req, res, next) => {
  if (req.files.thumbImage) {
    //thumb images
    req.body.thumbImage = `product-${Date.now()}-${Math.floor(
      Math.random() * 1000000
    )}-thumb.jpeg`;

    await sharp(req.files.thumbImage[0].buffer)
      .resize(2000, 1333)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`backend/public/img/product/${req.body.thumbImage}`);
  }

  if (req.files.images) {
    // images
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (file, i) => {
        const fileName = `product-${Date.now()}-${Math.floor(
          Math.random() * 1000000
        )}-image${i}.jpeg`;

        await sharp(file.buffer)
          .resize(2000, 1333)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(`backend/public/img/product/${fileName}`);

        req.body.images.push(fileName);
      })
    );
  }
  next();
});

exports.createProduct = catchAsync(async (req, res, next) => {
  // req.body.user = req.body.user || req.user.id;
  req.body.user = "6576be7a8d7fa310d22e1b4c";
  const newProduct = await Product.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      product: newProduct,
    },
  });
});

exports.getAllProduct = catchAsync(async (req, res, next) => {
  const feacture = new AppFeactures(Product.find(), req.query)
    .search()
    .filter()
    .sort()
    .field();

    // get total result before pagination
  const filterQuery = await feacture.query.clone();

  const totalResult=filterQuery.length;

  const product = await feacture.pagination().query;
 

  if (!product) return next(new AppError("Product are not available", 404));

  res.status(200).json({
    status: "success",
    result: product.length,
    totalResult,
    data: {
      product,
    },
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  // const product = await Product.findById(req.params.id).populate({
  //   path: "reviews",
  //   select: "review rating",
  // });
  const feacture = new AppFeactures(
    Product.findById(req.params.id),
    req.query
  ).field();
  const product = await feacture.query.populate({
    path: "reviews",
    select: "review rating",
  });
  if (!product)
    return next(
      new AppError(`Product are not exit for id: ${req.params.id}`, 404)
    );

  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product)
    return next(
      new AppError(`Product are not exit for id: ${req.params.id}`, 404)
    );

  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  await Product.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Product remove successfully.",
  });
});
