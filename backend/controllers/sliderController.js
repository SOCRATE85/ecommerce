const Slider = require("../models/sliderModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");

exports.createSlider = catchAsyncError(async(req, res, _next) => {
    const slider = await Slider.create(req.body);
    res.status(201).json({
        success: true,
        slider
    });
});

exports.listSliders = catchAsyncError(async(_req, res, _next) => {
    const sliders = await Slider.find();
    res.status(201).json({
        success: true,
        sliders
    });
});

exports.getSlider = catchAsyncError(async(req, res, next) => {
    const slider = await Slider.findById(req.params.id);

    if(!slider) {
        return next(new ErrorHandler("Requested slider is not available.", 404));
    }

    res.status(201).json({
        success: true,
        slider
    });
});

exports.updateSlider = catchAsyncError(async(req, res, next) => {
    let slider = await Slider.findById(req.params.id);
    if(!slider) {
        return next(new ErrorHandler("Requested slider is not available.", 404));
    }
    slider = await Slider.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(201).json({
        success: true,
        slider
    });
});

// delete attribute
exports.deleteSlider = catchAsyncError( async (req, res, next ) => {
    const slider = await Slider.findById(req.params.id);
    if(!slider){
        return next(new ErrorHandler("Slider not Found", 404));
    }

    await slider.remove();
    res.status(200).json({
        success: true,
        message: "Slider deleted successfully"
    });
});
