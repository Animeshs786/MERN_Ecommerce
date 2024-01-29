const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User name must be required."],
    minLenght: [3, "Name should be exceed than 3 letter."],
    maxLength: [30, "Name should not be exceed thant 30 letter."],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email must be required."],
    validate: [validator.isEmail, "Email should not be valid."],
    unique: [true, "Email already exist."],
  },
  password: {
    type: String,
    select: false,
    required: [true, "Password must be required."],
  },
  confirmPassword: {
    type: String,
    required: [true, "Password confirm must be required."],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "Cofirm password should not be same.",
    },
  },
  photo: {
    type: String,
    default: "default.jpg",
  },
  role: {
    type: String,
    default: "user",
  },
  passwordResetToken: String,
  passwordTokenExpiry: Date,
  passwordUpdatedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

//Document middleware use to hash the password before save in db.
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  this.confirmPassword = undefined;
  next();
});

//document middleware use to set update password time
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordUpdatedAt = Date.now();
  next();
});

//Mongoose instance method to compare user passowrd
userSchema.methods.comparePassword = async function (currentPassword) {
  return await bcrypt.compare(currentPassword, this.password);
};

//verfiy password should not be updated after token generate
userSchema.methods.updatePassword = function (tokenTimestamp) {
  if (this.passwordUpdatedAt) {
    const updateTimestamp = parseInt(
      this.passwordUpdatedAt.getTime() / 1000,
      10
    );
    return tokenTimestamp < updateTimestamp;
  }
  return false;
};

//Create Password reset token method
userSchema.methods.createPasswordResetToken = function () {
  const token = crypto.randomBytes(64).toString("hex");
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  this.passwordResetToken = passwordResetToken;
  this.passwordTokenExpiry = Date.now() + 10 * 60 * 1000;
  return token;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
