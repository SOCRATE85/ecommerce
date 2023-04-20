const express = require("express");
const {registerUser, registerUserbyAdmin, loginUser, logoutUser, updateUserRole, getSingleUser, forgetPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUser, deleteUser} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/admin/register").post(isAuthenticatedUser, authorizeRole("admin"), registerUserbyAdmin);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);
router.route("/password/forget").post(forgetPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/admin/users").get(isAuthenticatedUser, authorizeRole("admin"), getAllUser);
router.route("/admin/user/:id")
        .get(isAuthenticatedUser, authorizeRole("admin"), getSingleUser)
        .delete(isAuthenticatedUser, authorizeRole("admin"), deleteUser)
        .put(isAuthenticatedUser, authorizeRole("admin"), updateUserRole);

module.exports = router;