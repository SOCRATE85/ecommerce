const express = require("express");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");
const { createAttributeSet, updateAttributeset, getAllAttributeSets, getAttributesetDetails, deleteAttributeSet } = require("../controllers/attributesetController");
const router = express.Router();

router.route("/admin/attributeset/new").post(isAuthenticatedUser, authorizeRole("admin"), createAttributeSet);
router.route("/admin/attributesets").get(isAuthenticatedUser, authorizeRole("admin"), getAllAttributeSets);

router.route("/admin/attributeset/:id")
        .get(isAuthenticatedUser, authorizeRole("admin"), getAttributesetDetails)
        .put(isAuthenticatedUser, authorizeRole("admin"), updateAttributeset)
        .delete(isAuthenticatedUser, authorizeRole("admin"), deleteAttributeSet);

module.exports = router;
