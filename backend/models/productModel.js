const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product must have name."],
      minLength: [5, "Product name must have 5 character."],
      maxLenght: [
        100,
        "Product name should not be greater than 100 character.",
      ],
      unique: true,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price should be required."],
    },
    ratingAverage: {
      type: Number,
      default: 0,
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingNumber: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      trim: true,
    },
    specification: {
      type: String,
      tim: true,
    },
    series: String,
    quantity: {
      type: Number,
      default: 1,
    },
    thumbImage: String,
    images: [String],
    discount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price || this.get("price");
        },
        message: "Discount should be less than product price.",
      },
      default: 0,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },

    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Category must be requried."],
    },

    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//query middleware
productSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name",
  }).populate({
    path: "category",
    select: "name",
  });
  next();
});

// virtual populate to show the product review
productSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "product",
  localField: "_id",
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
