const express = require("express");
const {uploadImages} = require("../controllers/uploadController");
const router = express.Router();

router.route("/admin/upload").post(uploadImages);

module.exports = router;