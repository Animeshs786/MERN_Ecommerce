const express = require("express");

const {
  createProduct,
  getAllProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  uploadProductPhoto,
  resizeProductPhoto,
} = require("../controllers/productController");
const { protect, authorizeRole } = require("../controllers/authController");

const reviewRouter = require("./reviewRoutes");
const orderRouter = require("./orderRoutes");

const router = express.Router();

//nested route to create review using product id
router.use("/:id/reviews", reviewRouter);
router.use("/:id/orders", orderRouter);

router
  .route("/")
  .post(
    // protect,
    // authorizeRole("admin"),
    uploadProductPhoto,
    resizeProductPhoto,
    createProduct
  )
  .get(getAllProduct);
router
  .route("/:id")
  .get(getProduct)
  .patch(uploadProductPhoto, resizeProductPhoto, updateProduct)
  .delete(deleteProduct);

module.exports = router;
