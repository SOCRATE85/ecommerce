const express = require("express");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");
const { createAttribute, listAttributes, getAttribute, updateAttribute, deleteAttribute } = require("../controllers/attributeController");
const router = express.Router();

router.route("/admin/attribute/new").post(isAuthenticatedUser, authorizeRole("admin"), createAttribute);
router.route("/admin/attributes").get(isAuthenticatedUser, authorizeRole("admin"), listAttributes);
router.route("/admin/attribute/:id")
        .get(isAuthenticatedUser, authorizeRole("admin"), getAttribute)
        .put(isAuthenticatedUser, authorizeRole("admin"), updateAttribute)
        .delete(isAuthenticatedUser, authorizeRole("admin"), deleteAttribute);

module.exports = router;
