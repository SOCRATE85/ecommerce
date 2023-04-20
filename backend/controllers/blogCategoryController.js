const BlogCategory = require("../models/blogCategoryModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const slugify = require("../utils/slugify");

exports.createBlogCatgory = catchAsyncError(async (req, res, _next) => {
    req.body.url_key = slugify(req.body.name);
    console.log('req.body: ', req.body);
    const blogCategory = await BlogCategory.create(req.body);
    res.status(200)
    .json({
        success: true,
        blogcategory: blogCategory
    })
});

exports.updateBlogCategory = catchAsyncError(async (req, res, next) => {
    let blogCategory = await BlogCategory.findById(req.params.id);
    if(!blogCategory) {
        return next(new ErrorHandler("Blog Category not Found", 404));
    }
    blogCategory = await BlogCategory.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200)
    .json({
        success: true,
        blogcategory: blogCategory
    });
});

exports.getAllBlogCategory = catchAsyncError(async (_req, res, _next) => {
    const blogCategories = await BlogCategory.find();
    res.status(200)
    .json({
        success: true,
        blogCategories
    });
});

exports.getBlogCategoryDetail = catchAsyncError(async (req, res, next) => {
    const blogCategory = await BlogCategory.findById(req.params.id);
    if(!blogCategory) {
        return next(new ErrorHandler("Blog Category not Found", 404));
    }
    
    res.status(200)
    .json({
        success: true,
        blogcategory: blogCategory
    });
});

exports.deleteBlogCategory = catchAsyncError(async (req, res, next) => {
    let blogCategory = await BlogCategory.findById(req.params.id);
    if(!blogCategory) {
        return next(new ErrorHandler("Blog Category not Found", 404));
    }
    await blogCategory.remove();
    res.status(200)
    .json({
        success: true,
        message: "Blog Category deleted successfully."
    });
});
