const express = require("express");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");
const {
    createCartRule,
    getAllCartRule,
    getCartRule,
    updateCartRule,
    deleteCartRule
} = require('../controllers/cartruleController');
const router = express.Router();

router.route("/admin/cartrule/new").post(isAuthenticatedUser, authorizeRole("admin"), createCartRule);
router
    .route("/admin/cartrule/:id")
    .get(isAuthenticatedUser, authorizeRole("admin"), getCartRule)
    .put(isAuthenticatedUser, authorizeRole("admin"), updateCartRule)
    .delete(isAuthenticatedUser, authorizeRole("admin"), deleteCartRule);

router
    .route("/admin/cartrules")
    .get(isAuthenticatedUser, authorizeRole("admin"), getAllCartRule);

module.exports = router;
