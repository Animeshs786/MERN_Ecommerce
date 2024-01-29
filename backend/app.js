const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const productRoute = require("./routes/productRoutes");
const userRoute = require("./routes/userRoutes");
const globallErrorHandler = require("./controllers/errorController");
const categoryRoute = require("./routes/categoryRoutes");
const reviewRoute = require("./routes/reviewRoutes");
const orderRoute = require("./routes/orderRoutes");
const AppError = require("./utils/AppError");

const app = express();

//body parser middleware
app.use(express.json());

//cookie parser
app.use(cookieParser());

// Serve static files from the 'backend/public' directory
app.use("/api/img", express.static(path.join(__dirname, "public/img")));
// app.use("/public", express.static(path.join(__dirname, "public")));

//test middleware
app.use((req, res, next) => {
  // console.log(req);
  next();
});

//routes middleware
app.use("/api/v1/products", productRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use("/api/v1/orders", orderRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
  });
}


//undefine route error handler
app.all("*", function (req, res, next) {
  return next(new AppError("This route not  define in this server.", 404));
});

//global error handler middleware
app.use(globallErrorHandler);

module.exports = app;
