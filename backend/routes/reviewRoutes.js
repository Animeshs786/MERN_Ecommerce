const express = require("express");

const { protect } = require("../controllers/authController");
const {
  createReview,
  getAllReview,
  getReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

const router = express.Router({ mergeParams: true });

router.route("/").post(protect, createReview).get(getAllReview);

router
  .route("/:id")
  .get(protect, getReview)
  .patch(protect, updateReview)
  .delete(protect, deleteReview);

module.exports = router;
