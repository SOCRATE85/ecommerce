const express = require("express");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");
const {
    createCatalogRule,
    getAllCatalogRule,
    getCatalogRule,
    updateCatalogRule,
    deleteCatalogRule
} = require('../controllers/catalogruleController');
const router = express.Router();

router.route("/admin/catalog_rule/new").post(isAuthenticatedUser, authorizeRole("admin"), createCatalogRule);
router
    .route("/admin/catalog_rule/:id")
    .get(isAuthenticatedUser, authorizeRole("admin"), getCatalogRule)
    .put(isAuthenticatedUser, authorizeRole("admin"), updateCatalogRule)
    .delete(isAuthenticatedUser, authorizeRole("admin"), deleteCatalogRule);
router
    .route('/catalog_rule')
    .get(getCatalogRule);
router
    .route("/admin/catalog_rules")
    .get(isAuthenticatedUser, authorizeRole("admin"), getAllCatalogRule);

module.exports = router;
