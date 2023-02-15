const Attribute = require("../models/attributeModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");

exports.createAttribute = catchAsyncError(async(req, res, next) => {
    const attribute_code = req.body.attribute_code;
    const frontend_label = req.body.frontend_label;
    if(req.body.attribute_options) {
        req.body.attribute_options = JSON.parse(req.body.attribute_options);
    }
    let attribute = await Attribute.find({ attribute_code });
    if(attribute.length > 0) {
        return next(new ErrorHandler("Same Attribute Code already exists.", 404));
    }
    attribute = await Attribute.find({ frontend_label });

    if(attribute.length > 0) {
        return next(new ErrorHandler("Same Attribute Name already exists.", 404));
    }

    const _attribute = await Attribute.create(req.body);

    res.status(201).json({
        success: true,
        attribute: _attribute
    });
});

exports.listAttributes = catchAsyncError(async(_req, res, _next) => {
    const attributes = await Attribute.find();

    res.status(201).json({
        success: true,
        attributes
    });
});

exports.getAttribute = catchAsyncError(async(req, res, next) => {
    const attribute = await Attribute.findById(req.params.id);

    if(!attribute) {
        return next(new ErrorHandler("Requested attribute is not available.", 404));
    }

    res.status(201).json({
        success: true,
        attribute
    });
});

exports.updateAttribute = catchAsyncError(async(req, res, next) => {
    let attribute = await Attribute.findById(req.params.id);

    if(!attribute) {
        return next(new ErrorHandler("Requested attribute is not available.", 404));
    }
    if(req.body.attribute_options) {
        req.body.attribute_options = JSON.parse(req.body.attribute_options);
    }
    attribute = await Attribute.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(201).json({
        success: true,
        attribute
    });
});

// delete attribute
exports.deleteAttribute = catchAsyncError( async (req, res, next ) => {
    const attribute = await Attribute.findById(req.params.id);
    if(!attribute){
        return next(new ErrorHandler("Attribute not Found", 404));
    }

    await attribute.remove();
    res.status(200).json({
        success: true,
        message: "Attribute deleted successfully"
    });
});
