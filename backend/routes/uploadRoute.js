const express = require("express");
const {uploadImages} = require("../controllers/uploadController");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");
const router = express.Router();

router.route("/admin/upload").post(isAuthenticatedUser, authorizeRole("admin"), uploadImages);

module.exports = router;