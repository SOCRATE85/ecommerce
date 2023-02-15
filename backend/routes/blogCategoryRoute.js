const express = require("express");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");
const {
    createBlogCatgory,
    updateBlogCategory,
    getAllBlogCategory,
    getBlogCategoryDetail,
    deleteBlogCategory
} = require("../controllers/blogCategoryController");
const router = express.Router();

router
    .route("/admin/blog/category/new")
    .post(isAuthenticatedUser, authorizeRole("admin"), createBlogCatgory);
router
    .route("/admin/blog/categories")
    .get(isAuthenticatedUser, authorizeRole("admin"), getAllBlogCategory);
router
    .route("/admin/blog/category/:id")
    .get(isAuthenticatedUser, authorizeRole("admin"), getBlogCategoryDetail)
    .put(isAuthenticatedUser, authorizeRole("admin"), updateBlogCategory)
    .delete(isAuthenticatedUser, authorizeRole("admin"), deleteBlogCategory);

module.exports = router;