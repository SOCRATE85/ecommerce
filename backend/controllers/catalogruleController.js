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

const applyRule = async (data) => {
    console.log("req.body.from_date: ", data.from_date);
    console.log("data.to_date: ", data.to_date);
    console.log("data.is_active: ", data.is_active);
    console.log("data.conditions_serialized: ", JSON.parse(data.conditions_serialized));
    console.log("data.simple_action: ", data.simple_action);
    console.log("data.discount_amount: ", data.discount_amount);
    console.log("data.stop_rules_processing: ", data.stop_rules_processing);
    if(data.stop_rules_processing) {
        const rules = await Catalogrule.find();
        for(let key in rules) {
            if(rules[key].is_active) {
                console.log(`rules[${key}]`, rules[key]);
            }
        }
    }
}

exports.updateCatalogRule = catchAsyncError(async (req, res, next) => {
    let rule = await Catalogrule.findById(req.params.id);
    
    if(!rule){
        return next(new ErrorHandler("Catalogrule is not exists", 404));
    }

    await applyRule(req.body);

    if(req.body.saveandapply === 'true') {
        rule = await Catalogrule.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });
    } else {
        rule = await Catalogrule.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });
    }

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
