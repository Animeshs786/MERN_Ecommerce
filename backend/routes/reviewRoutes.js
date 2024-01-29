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

router.use(protect);

router.route("/").post(createReview).get(getAllReview);
router.route("/:id").get(getReview).patch(updateReview).delete(deleteReview);

module.exports = router;
