const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const Cartrule = require("../models/cartRuleModel");

exports.createCartRule = catchAsyncError(async (req, res, _next) => {
    const rule = await Cartrule.create(req.body);
    res.status(200).json({
        success: true,
        cartrule: rule
    });
});

exports.getCartRule = catchAsyncError(async (req, res, next) => {
    const rule = await Cartrule.findById(req.params.id);
    if(!rule){
        return next(new ErrorHandler("Cart Rule is not exists", 404));
    }
    res.status(200).json({
        success: true,
        cartrule: rule
    });
});

exports.getAllCartRule = catchAsyncError(async (_req, res, _next) => {
    const rules = await Cartrule.find();
    res.status(200).json({
        success: true,
        cartrules: rules
    });
});

exports.updateCartRule = catchAsyncError(async (req, res, next) => {
    let rule = await Cartrule.findById(req.params.id);
    
    if(!rule){
        return next(new ErrorHandler("Cart Rule is not exists", 404));
    }

    if(req.body.saveandapply === 'true') {
        rule = await Cartrule.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });
    } else {
        rule = await Cartrule.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });
    }

    res.status(200).json({
        success: true,
        cartrule: rule
    });
});

exports.deleteCartRule = catchAsyncError(async (req, res, next) => {
    let rule = await Cartrule.findById(req.params.id);
    if(!rule) {
        return next(new ErrorHandler("Cart Rule is not exists", 404));
    }
    await rule.remove();
    res.status(200).json({
        success: true,
        message: "Cart Rule is deleted successfully"
    });
});
