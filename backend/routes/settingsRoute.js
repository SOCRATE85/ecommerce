const express = require("express");
const {createSetting, getAllSettings} = require("../controllers/settingsController");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");
const router = express.Router();

router.route("/admin/setting/new").post(isAuthenticatedUser, authorizeRole("admin"), createSetting);
router.route("/admin/settings").post(isAuthenticatedUser, authorizeRole("admin"), getAllSettings);

module.exports = router;