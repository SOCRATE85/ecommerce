const BlogPost = require("../models/blogPostModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");

exports.createBlog = catchAsyncError(async (req, res, _next) => {
    const blog = await BlogPost.create(req.body);
    res.status(200)
        .json({
            success: true,
            blog
        });
});

exports.updateBlog = catchAsyncError(async (req, res, next) => {
    let blog = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    if(!blog) {
        return next(new ErrorHandler("Blog not Found", 404));
    }
    res.status(200).json({
        sucess: true,
        blog
    })
});

exports.getAllBlog = catchAsyncError(async (_req, res, _next) => {
    const blogs = await BlogPost.find();
    res.status(200).json({
        success: true,
        blogs
    });
});

exports.getBlogListFrontend = catchAsyncError(async (req, res, _next) => {
    let limit = 10;
    let order = 'asc';
    let sortby = 'title';

    if(req.query.limit) {
        limit = req.query.limit;
    }

    if(req.query.order) {
        order = req.query.order;
    }

    if(req.query.sortby) {
        sortby = req.query.sortby;
    }

    const blogCategories = await BlogPost.find()
                                        .setOptions({ lean: true })
                                        .limit(limit)
                                        .sort([sortby, order]);

    res.status(200).json({
        success: true,
        blogCategories
    });
});

exports.getBlogDetail = catchAsyncError(async (req, res, next) => {
    let blog = await BlogPost.findById(req.params.id);
    if(!blog) {
        return next(new ErrorHandler("Blog is not exists", 404));
    }
    res.status(200).json({
        success: true,
        blog
    });
});

exports.deleteBlog = catchAsyncError(async (req, res, next) => {
    let blog = await BlogPost.findById(req.params.id);
    if(!blog) {
        return next(new ErrorHandler("Blog is not exists", 404));
    }
    await blog.remove();
    res.status(200).json({
        success: true,
        message: "Blog deleted successfully"
    });
});
