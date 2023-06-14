const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const Catalogrule = require("../models/catalogruleModel");

exports.createCatalogRule = catchAsyncError(async (req, res, _next) => {
    const rule = await Catalogrule.create(req.body);
    res.status(200).json({
        success: true,
        catalogrule: rule
    });
});

exports.getCatalogRule = catchAsyncError(async (req, res, next) => {
    const rule = await Catalogrule.findById(req.params.id);
    if(!rule){
        return next(new ErrorHandler("Catalogrule is not exists", 404));
    }
    res.status(200).json({
        success: true,
        catalogrule: rule
    });
});

exports.getAllCatalogRule = catchAsyncError(async (_req, res, _next) => {
    const rules = await Catalogrule.find();
    res.status(200).json({
        success: true,
        catalogrules: rules
    });
});

exports.updateCatalogRule = catchAsyncError(async (req, res, next) => {
    let rule = await Catalogrule.findById(req.params.id);
    if(!rule){
        return next(new ErrorHandler("Catalogrule is not exists", 404));
    }
    rule = await Catalogrule.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        catalogrule: rule
    });
});

exports.deleteCatalogRule = catchAsyncError(async (req, res, next) => {
    let rule = await Catalogrule.findById(req.params.id);
    if(!rule) {
        return next(new ErrorHandler("Catalogrule is not exists", 404));
    }
    await rule.remove();
    res.status(200).json({
        success: true,
        message: "Catalogrule is deleted successfully"
    });
});
