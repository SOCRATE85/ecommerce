const Attribute = require('../models/attributeModel');
const Product = require("../models/productModel");
const AttributeSet = require('../models/attributesetModel');
const AttributeGroup = require('../models/attributegroupModel');
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");

async function getAttrubteGroupList(copyAttributeSet) {
    let attributeGroupList = [];
    for(let key in copyAttributeSet) {
        const groupdetails = await AttributeGroup.findById(copyAttributeSet[key].attributeGroupId);

        let attributeList = [];
        groupdetails.attributes.forEach(async (attribute) => {
            attributeList.push({
                attributeId: attribute.attributeId,
                attributeName: attribute.attributeName
            });
        });

        const attributeGroup = await AttributeGroup.create({
            attribute_group_name: groupdetails.attribute_group_name,
            attributes: attributeList
        });

        attributeGroupList.push({
            attributeGroupId: attributeGroup._id,
            attributeGroup: attributeGroup.attribute_group_name
        });
    }
    return attributeGroupList;
}

exports.createAttributeSet = catchAsyncError(async (req, res, next) => {
    const attributeSetName = req.body.attributeSetName;
    const attributeSetReference = req.body.attributeSetReference;
    let attributeSet = await AttributeSet.find({ attribute_set_name: attributeSetName });
    
    if(attributeSet.length > 0) {
        return next(new ErrorHandler("Attribute Set with same name already exists.", 404));
    }
    
    if(attributeSetReference) {
        const copyAttributeSet = await AttributeSet.findById(attributeSetReference);
        const attribute_group = await getAttrubteGroupList(copyAttributeSet.attribute_group);
        attributeSet = await AttributeSet.create({
            attribute_set_name: attributeSetName,
            attribute_group
        });
    }
    
    res.status(201).json({
        success: true,
        attributeset: attributeSet
    });
});

async function updateAttrubteGroupList(copyAttributeSet) {
    let attributeGroupList = [];
    
    for(let key in copyAttributeSet) {
        if(copyAttributeSet[key]._id === undefined) {
            let attributeList = [];
            copyAttributeSet[key].attributes.forEach(async (attribute) => {
                attributeList.push({
                    attributeId: attribute._id,
                    attributeName: attribute.frontend_label
                });
            });
            const attributeGroup = await AttributeGroup.create({
                attribute_group_name: copyAttributeSet[key].title,
                attributes: attributeList
            });
            attributeGroupList.push({
                attributeGroupId: attributeGroup._id,
                attributeGroup: copyAttributeSet[key].title
            });
        } else {
            let attributeList = [];
            copyAttributeSet[key].attributes.forEach(async (attribute) => {
                attributeList.push({
                    attributeId: attribute._id,
                    attributeName: attribute.frontend_label
                });
            });
            const attributeGroup = await AttributeGroup.findByIdAndUpdate(copyAttributeSet[key]._id, {
                attribute_group_name: copyAttributeSet[key].title,
                attributes: attributeList
            }, {
                new: true,
                runValidators: true,
                useFindAndModify: false
            });
            
            attributeGroupList.push({
                attributeGroupId: attributeGroup._id,
                attributeGroup: copyAttributeSet[key].title
            });
        }        
    }
    return attributeGroupList;
}

exports.updateAttributeset = catchAsyncError(async (req, res, next) => {
    const id = req.params.id;
    let attributeSet = await AttributeSet.findById(id);
    if(!attributeSet){
        return next(new ErrorHandler("AttributeSet not Found", 404));
    }
    const attributeSetName = req.body.attributeSetName;
    const attributeSetData = JSON.parse(req.body.attributeSetData);
    const attribute_group = await updateAttrubteGroupList(attributeSetData);
    attributeSet = await AttributeSet.findByIdAndUpdate(id, {
        attribute_set_name: attributeSetName,
        attribute_group
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        attributeset: attributeSet
    });
});

exports.getAllAttributeSets = catchAsyncError(async (_req, res, _next) => {
    const attributesets = await AttributeSet.find();
    const _attributesets = [];
    for(let key in attributesets) {
        const attribute_grouplist = attributesets[key].attribute_group;
        const _attributeGroup = [];
        for(let _key in attribute_grouplist) {
            const attribute_group = await AttributeGroup.findById(attribute_grouplist[_key].attributeGroupId);
            const attributelist = attribute_group.attributes;
            const _attributes = [];
            for(let __key in attributelist) {
                const attribute = await Attribute.findById(attributelist[__key].attributeId);
                _attributes.push(attribute);
            }
            _attributeGroup.push({
                attributeGroupId: attribute_grouplist[_key].attributeGroupId,
                attributeGroup: attribute_grouplist[_key].attributeGroup,
                _id: attribute_grouplist[_key]._id,
                attributes: _attributes
            });
        }
        const products = await Product.find({attributeset: attributesets[key]._id});
        _attributesets.push({
             _id: attributesets[key]._id,
            attribute_set_name: attributesets[key].attribute_set_name, 
            attribute_group: _attributeGroup,
            products
        });
    }
    
    res.status(201).json({
        success: true,
        attributesets: _attributesets
    });
});

exports.getAttributesetDetails = catchAsyncError(async (req, res, _next) => {
    const attributeset = await AttributeSet.findById(req.params.id);
    const attribute_group =  attributeset.attribute_group;
    const _attributeGroup = [];
    for (let key in attribute_group) {
        const attributeGroupId = attribute_group[key].attributeGroupId;
        const attributeGroup = await AttributeGroup.findById(attributeGroupId);
        const groups = [];
        for (let _key in attributeGroup.attributes) {
            const attribute = await Attribute.findById(attributeGroup.attributes[_key].attributeId);
            groups.push({
                frontend_label: attributeGroup.attributes[_key].attributeName,
                is_done: true,
                is_user_defined: attribute.is_user_defined,
                moved: false,
                _id: attributeGroup.attributes[_key].attributeId,
            });
        }
        _attributeGroup.push({
            _id: attribute_group[key].attributeGroupId,
            title: attribute_group[key].attributeGroup,
            index: key,
            attributes: groups
        });
    }

    res.status(201).json({
        success: true,
        attributeset: {
            _id: attributeset._id,
            attribute_set_name: attributeset.attribute_set_name, 
            attributeGroup: _attributeGroup
        }
    });
});

exports.deleteAttributeSet = catchAsyncError(async(req, res, next) => {
    const attributeset = await AttributeSet.findById(req.params.id);
    if(!attributeset) {
        return next(new ErrorHandler("This attribute set is not exits.", 404)); 
    }
    const attributeGroup = attributeset.attribute_group;
    for(let key in attributeGroup) {
        const attributeGroupId = attributeGroup[key].attributeGroupId;
        await AttributeGroup.findByIdAndDelete(attributeGroupId);
    }
    await attributeset.remove();
    res.status(200).json({
        success: true,
        message: "Attribute set deleted successfully"
    });
});
