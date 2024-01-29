const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Category name must be required."],
    unique: [true, "Category name already exist."],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "User id must be required."],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
