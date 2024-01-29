const mongoose = require("mongoose");

const Product = require("./productModel");

const orderSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: [true, "Address is required."],
    },
    country: {
      type: String,
      required: [true, "Country is required."],
    },
    pincode: {
      type: Number,
      required: [true, "Pincode is required."],
    },
    phoneNumber: {
      type: Number,
      required: [true, "Phone Number is required."],
    },
    orderStatus: {
      type: String,
      enum: {
        values: ["Pending", "Processing", "Shipped", "Delivered"],
        message:
          "Order status either be : Pending , Processing , Shipped, Delivered ",
      },
      default: "Pending",
    },
    paymentType: {
      type: String,
      enum: {
        values: ["Cash On Delivery", "Debit Card"],
        message: "Payment type either be: Cash On Delivery , Debit Card",
      },
      default: "Cash On Delivery",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },
    product: [
      {
        productId: { type: String, required: true },
        image: String,
        name: String,
        quantity: Number,
        unitPrice: Number,
        subTotal: Number,
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      // required: [true, "User ID is required."],
      default: "6576be7a8d7fa310d22e1b4c",
    },
    price: {
      type: Number,
      required: [true, "Product Price is required."],
    },
    shippingPrice: {
      type: Number,
      default: 0,
    },
    gst: {
      type: Number,
      default: 0,
    },
    tax: {
      type: Number,
      default: 0,
    },
    orderAt: {
      type: Date,
      default: Date.now,
    },
    deliverAt: {
      type: Date,
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

//virtual schema to calculate total price
orderSchema.virtual("totalPrice").get(function () {
  return this.price * this.quantity + this.shippingPrice + this.tax;
});

//mongoose query middleware
orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "product",
    select: "name",
  }).populate({
    path: "user",
    select: "name",
  });
  next();
});

// document middleware to update the product quantity
orderSchema.pre("save", async function (next) {
  if (!this.isModified("orderStatus") || this.orderStatus !== "Delivered")
    return next();

  try {
    // Assuming Product is your Mongoose model for products
    const updatePromises = this.product.map(async (item) => {
      const product = await Product.findById(item.productId);
      if (product) {
        product.quantity -= item.quantity;
        return product.save();
      }
    });

    await Promise.all(updatePromises);
    this.deliverAt = Date.now();
    next();
  } catch (error) {
    next(error);
  }
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
