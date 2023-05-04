const BlogPost = require("../models/blogPostModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const slugify = require("../utils/slugify");

const validateUrlForNewBlogTitle = async (url_key, blogId) => {
    const blogs = await BlogPost.find({ url_key });
    const isValid = blogs.filter(item => item._id !== blogId);
    if(isValid.length > 0) {
        return `${url_key}-${isValid.length}`;
    }
    return url_key;
}

const validateUrlForUpdatedBlogTitle = async (url_path, blogId, newUrl_key) => {
    if(url_path.trim() !== newUrl_key.trim()) {
        const products = await BlogPost.find({ url_path });
        const isValid = products.filter(item => item._id !== blogId);
        if(isValid.length > 0) {
            return `${url_path}-${isValid.length}`;
        }
    }
}

exports.createBlog = catchAsyncError(async (req, res, _next) => {
    req.body.categories = req.body.categories.split(",");
    let images = [];
    if(typeof req.body.blogimages === "string") {
        images.push(req.body.blogimages);
    }else{
        images = req.body.blogimages;
    }
    
    req.body.blogimages = images;
    const slug = slugify(req.body.title);
    const url = await validateUrlForNewBlogTitle(slug, req.params.id);
    req.body.url_key = url;
    req.body.url_path = slug;

    const blog = await BlogPost.create(req.body);
    res.status(200)
        .json({
            success: true,
            blog
        });
});

exports.updateBlog = catchAsyncError(async (req, res, next) => {
    let blog = await BlogPost.findById(req.params.id);
    if(!blog) {
        return next(new ErrorHandler("Blog not Found", 404));
    }
    req.body.categories = req.body.categories.split(",");
    let images = [];
    
    if(typeof req.body.blogimages === "string") {
        images.push(req.body.blogimages);
    }else{
        images = req.body.blogimages;
    }
    const slug= slugify(req.body.title);
    req.body.blogimages = images;
    const url = await validateUrlForUpdatedBlogTitle(blog.url_path, req.params.id, slug);
    if(url) {
        req.body.url_key = url;
    }
    req.body.url_key = url;
    req.body.url_path = slug;

    blog = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

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
    let blog = await BlogPost.findById(req.params.id).populate("categories");
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
