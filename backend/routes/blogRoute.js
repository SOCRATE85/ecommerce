const express = require("express");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");
const { 
    createBlog,
    getAllBlog,
    getBlogDetail,
    getBlogListFrontend,
    updateBlog,
    deleteBlog
} = require("../controllers/blogController");
const router = express.Router();

router
    .route("/blogs")
    .get(getBlogListFrontend);
router
    .route("/blog/:id")
    .get(getBlogDetail);
router
    .route("/admin/blog/new")
    .post(isAuthenticatedUser, authorizeRole("admin"), createBlog);
router
    .route("/admin/blogs")
    .get(isAuthenticatedUser, authorizeRole("admin"), getAllBlog);
router
    .route("/admin/blog/:id")
    .get(isAuthenticatedUser, authorizeRole("admin"), getBlogDetail)
    .put(isAuthenticatedUser, authorizeRole("admin"), updateBlog)
    .delete(isAuthenticatedUser, authorizeRole("admin"), deleteBlog);

module.exports = router;