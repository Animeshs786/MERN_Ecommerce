const mongoose = require("mongoose");

const Product = require("./productModel");

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      trim: true,
      required: [true, "Review must be required."],
    },
    rating: {
      type: Number,
      min: [1, "Minimum rating value should be 1."],
      max: [5, "Maximum rating value should be 5."],
      required: [true, "Rating must be required."],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "User id must be required."],
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: [true, "Product id must be required."],
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

//indexing the user and product field
reviewSchema.index({ user: 1, product: 1 }, { unique: true });

//mongoose query middleware
reviewSchema.pre(/^find/, function (next) {
  // this.populate({
  //   path: "product",
  //   select: "name",
  // }).populate({
  //   path: "user",
  //   select: "name",
  // });

  this.populate({
    path: "user",
    select: "name photo",
  });
  next();
});

//mongoose static method to calculate rating average
reviewSchema.statics.calculateRatingAverage = async function (productId) {
  const stats = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: "$product",
        nRating: { $sum: 1 },
        ratingAvg: { $avg: "$rating" },
      },
    },
  ]);

  if (stats.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      ratingNumber: stats[0].nRating,
      ratingAverage: stats[0].ratingAvg,
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      ratingNumber: 0,
      ratingAverage: 0,
    });
  }
};

reviewSchema.post("save", async function () {
  await this.constructor.calculateRatingAverage(this.product);
});

// user query middledware to update rating average during update and delete
reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.model.findOne();
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  await this.r.constructor.calculateRatingAverage(this.r.product._id);
});


const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
