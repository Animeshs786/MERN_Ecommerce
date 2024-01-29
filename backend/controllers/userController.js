const multer = require("multer");
const sharp = require("sharp");

const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "backend/public/img/user");
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split("/")[1];

//     // user-userId-currentTime.ext
//     const filename = `user-${req.params.id}-${Date.now()}.${ext}`;
//     cb(null, filename);
//   },
// });

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image")) {
    cb(new AppError("Only image should be uploaded.", 400), false);
  } else {
    cb(null, true);
  }
};

exports.getAllUser = catchAsync(async (req, res, next) => {
  const user = await User.find();

  res.status(200).json({
    status: "success",
    result: user?.length,
    data: {
      user,
    },
  });
});

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadUserPhoto = upload.single("photo");

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.body.filename = `user-${req.params.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`backend/public/img/user/${req.body.filename}`);

  next();
});

exports.getActiveUser = catchAsync(async (req, res, next) => {
  req.params.id = req.user.id;
  next();
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError(`User not exit for Id: ${req.params.id}`, 400));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.updateMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateUser = catchAsync(async (req, res, next) => {
  const updateOptions = {
    name: req.body.name,
    email: req.body.email,
  };

  if (req.file) updateOptions.photo = req.body.filename;

  const user = await User.findByIdAndUpdate(req.params.id, updateOptions, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(new AppError(`User not exit for Id: ${req.params.id}`, 400));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    message: "User removed successfully.",
  });
});
