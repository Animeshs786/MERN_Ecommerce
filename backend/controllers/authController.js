const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const sendEmail = require("../utils/sendEmail");

const tokenSignIn = (id) => {
  return jwt.sign({ id }, process.env.JWT_TOKEN, {
    expiresIn: process.env.JWT_TOKEN_EXPIRY,
  });
};

const createUserToken = (user, statusCode, res) => {
  const token = tokenSignIn(user._id);

  const cookieOptions = {
    httpOnly: true,
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRY * 24 * 60 * 60 * 1000
    ),
  };

  res.cookie("jwt", token, cookieOptions);

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  createUserToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  //Step1. require email and passwod
  if (!req.body.email || !req.body.password) {
    return next(new AppError("Password and Email must be required.", 400));
  }

  //Step2. Email and Password verification
  const user = await User.findOne({ email: req.body.email }).select(
    "+password"
  );

  if (!user || !(await user.comparePassword(req.body.password))) {
    return next(new AppError("Invalid Email and Password.", 404));
  }

  //Step3. Create token
  createUserToken(user, 200, res);
});

exports.logout = catchAsync(async (req, res, next) => {
  res.cookie("jwt", "", { expires: new Date(0), httpOnly: true });

  res.status(200).json({
    status: "success",
    message: "User Logout successfully.",
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  //Step1. check token exit or not
  if (
    req.headers.authorization &&
    req.headers.authorization?.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not login. Please login to access.", 404)
    );
  }

  //Step2. verify the token
  const decoded = jwt.verify(token, process.env.JWT_TOKEN);

  //Step3. check user not removed
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new AppError("User not existed.", 404));
  }

  //Step4. check password update
  if (user.updatePassword(decoded.iat)) {
    return next(new AppError("Password updated login again.", 404));
  }
  req.user = user;
  next();
});

exports.authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("You don't have permission to access.", 400));
    }
    next();
  };
};

exports.forgetPassword = catchAsync(async (req, res, next) => {
  //Step1. Verify email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("Email are not valid.", 400));
  }

  //Step2. create reset field in document using mongoose methods
  const token = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const url = `${req.protocol}://${req.get(
    "host"
  )}/app/v1/users/resetPassword/${token}`;

  const message = `Click on the link to reset password. ${url}`;

  const options = {
    email: user.email,
    message,
    subject: "Password Reset",
  };

  console.log(url);

  //   try {
  //     await sendEmail(options);
  //   } catch (err) {
  //     console.log(err);
  //     user.passwordResetToken = undefined;
  //     user.passwordTokenExpiry = undefined;
  //     await user.save({ validateBeforeSave: false });
  //     return next(new AppError("Email not send", 404));
  //   }

  res.status(200).json({
    status: "success",
    message: "Password Reset link send  to your email.",
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  //Step1. hash the password token
  const token = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  //Step2. verify the token and token expiry
  const user = await User.findOne({
    passwordResetToken: token,
    passwordTokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError("Password token has been expired.", 400));
  }

  //Step3. Reset the password
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordTokenExpiry = undefined;

  await user.save();
  createUserToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  //Step1. verify older password is correct or not
  const user = await User.findById(req.user.id).select("+password");
  const correct = await user.comparePassword(req.body.oldPassword);

  if (!correct) {
    return next(new AppError("Old Password not correct"));
  }

  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  await user.save();

  createUserToken(user, 200, res);
});
