const Banner = require("../models/bannerModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");

exports.createBanner = catchAsyncError(async(req, res, _next) => {
    const banner = await Banner.create(req.body);
    res.status(201).json({
        success: true,
        banner
    });
});

exports.listBanners = catchAsyncError(async(_req, res, _next) => {
    const banners = await Banner.find().populate('slider_id');
    res.status(201).json({
        success: true,
        banners
    });
});

exports.getBanner = catchAsyncError(async(req, res, next) => {
    const banner = await Banner.findById(req.params.id).populate('slider_id');
    if(!banner) {
        return next(new ErrorHandler("Requested Banner is not available.", 404));
    }
    res.status(201).json({
        success: true,
        banner
    });
});

exports.updateBanner = catchAsyncError(async(req, res, next) => {
    let banner = await Banner.findById(req.params.id);
    if(!banner) {
        return next(new ErrorHandler("Requested banner is not available.", 404));
    }
    banner = await Banner.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(201).json({
        success: true,
        banner
    });
});

// delete attribute
exports.deleteBanner = catchAsyncError( async (req, res, next ) => {
    const banner = await Banner.findById(req.params.id);
    if(!banner){
        return next(new ErrorHandler("Banner not Found", 404));
    }
    await banner.remove();
    res.status(200).json({
        success: true,
        message: "Banner deleted successfully"
    });
});
