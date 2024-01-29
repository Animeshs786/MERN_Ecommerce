const express = require("express");

const { protect, authorizeRole } = require("../controllers/authController");
const {
  createOrder,
  getAllOrder,
  getOrder,
  updateOrder,
  deleteOrder,
  getMyOrder,
  getUserOrder,
} = require("../controllers/orderController");

const router = express.Router({ mergeParams: true });

router.use(protect);

router.route("/").post(createOrder).get(authorizeRole("admin"),getAllOrder);

//for get login user order
router.route("/myOrder").get(getMyOrder, getUserOrder);

router
  .route("/:id")
  .get(getOrder)
  .patch(authorizeRole("admin"), updateOrder)
  .delete(authorizeRole("admin"), deleteOrder);

// get all the order of the user
router.route("/userOrder/:userId").get(authorizeRole("admin"), getUserOrder);

module.exports = router;
