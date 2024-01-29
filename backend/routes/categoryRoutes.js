const express = require("express");

const { protect, authorizeRole } = require("../controllers/authController");
const {
  createCategory,
  getAllCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const router = express.Router();

// router.use(protect, authorizeRole("admin"));
router.route("/").post(createCategory).get(getAllCategory);
router
  .route("/:id")
  .get(getCategory)
  .patch(updateCategory)
  .delete(deleteCategory);

module.exports = router;
