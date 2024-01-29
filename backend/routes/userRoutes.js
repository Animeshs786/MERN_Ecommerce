const express = require("express");

const {
  signUp,
  login,
  protect,
  authorizeRole,
  forgetPassword,
  resetPassword,
  updatePassword,
  logout,
} = require("../controllers/authController");
const {
  getAllUser,
  updateUser,
  getUser,
  deleteUser,
  updateMe,
  uploadUserPhoto,
  resizeUserPhoto,
  getActiveUser,
} = require("../controllers/userController");

const router = express.Router();

router.post("/signUp", signUp);
router.post("/login", login);
router.post("/forgetPassword", forgetPassword);
router.post("/resetPassword/:token", resetPassword);
router.post("/updatePassword", protect, updatePassword);
router.post("/logout", protect, logout);

router
  .route("/updateMe")
  .patch(protect, uploadUserPhoto, resizeUserPhoto, updateMe, updateUser);

router.route("/activeUser").get(protect,getActiveUser, getUser);

router.route("/").get(protect, authorizeRole("admin"), getAllUser);

router
  .route("/:id")
  .get(getUser)
  .patch(uploadUserPhoto, resizeUserPhoto, updateUser)
  .delete(deleteUser);

module.exports = router;
