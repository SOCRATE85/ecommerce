const ProductValueText = require("../models/productValueTextModel");
const ProductValueInt = require("../models/productValueIntModel");
const ProductValueImage = require("../models/productValueImageModel");
const ProductValueDate = require('../models/productValueDateModel');
const ProductValueBoolean = require("../models/productValueBooleanModel");
const AttributeSet = require('../models/attributesetModel');
const AttributeGroup = require("../models/attributegroupModel");
const Attribute = require("../models/attributeModel");

const getproductDetailsWithAttributes = async (products) => {
    try {
        const _products = [];
        for(let productKey in products) {
            const attributesetId = products[productKey].attributeset;
            const AttributeSetResult = await AttributeSet.find({_id: attributesetId});
            for(let attributeSetKey in AttributeSetResult) {
                const attributeGroups = AttributeSetResult[attributeSetKey].attribute_group;
                const _attributeGroup = [];
                for(let attributeGroupKey in attributeGroups) {
                    const attributeGroup = await AttributeGroup.findById(attributeGroups[attributeGroupKey].attributeGroupId);
                    const _attributes = {};
                    const attributes = attributeGroup.attributes;
                    for(let attributeKey in attributes) {
                        const attributeId = attributes[attributeKey].attributeId;
                        const attribute = await Attribute.findById(attributeId);
                        let result = null;
                        let resultAll = null;
                        switch (attribute.frontend_input) {
                            case 'text':
                            case 'textarea':
                                result = await ProductValueText.findOne({productId: products[productKey]._id, attributeId: attributes[attributeKey].attributeId});
                                if(result) {
                                    _attributes[result.attributeCode] = {
                                        attributType: result.attributType,
                                        attributeId: result.attributeId,
                                        attributeCode: result.attributeCode,
                                        attributeGroupId: result.attributeGroupId,
                                        attributeGroup: result.attributeGroup,
                                        value: result.value,
                                        groupIndex: result.groupIndex,
                                        _id: result._id,
                                        productId: products[productKey]._id,
                                    };
                                }
                            break;
                            case 'file':
                                const _images = [];
                                resultAll = await ProductValueImage.find({productId: products[productKey]._id, attributeId: attributes[attributeKey].attributeId});
                                for(let imageKey in resultAll) {
                                    _images.push(resultAll[imageKey].value);
                                }
                                result = await ProductValueImage.findOne({productId: products[productKey]._id, attributeId: attributes[attributeKey].attributeId});
                                if(result) {
                                _attributes[result.attributeCode] = {
                                    attributType: result.attributType,
                                    attributeId: result.attributeId,
                                    attributeCode: result.attributeCode,
                                    attributeGroupId: result.attributeGroupId,
                                    attributeGroup: result.attributeGroup,
                                    value: _images,
                                    groupIndex: result.groupIndex,
                                    _id: result._id,
                                    productId: products[productKey]._id,
                                };
                                }
                            break;
                            case 'date':
                                result = await ProductValueDate.findOne({productId: products[productKey]._id, attributeId: attributes[attributeKey].attributeId});
                                if(result) {
                                    _attributes[result.attributeCode] = {
                                        attributType: result.attributType,
                                        attributeId: result.attributeId,
                                        attributeCode: result.attributeCode,
                                        attributeGroupId: result.attributeGroupId,
                                        attributeGroup: result.attributeGroup,
                                        value: result.value,
                                        groupIndex: result.groupIndex,
                                        _id: result._id,
                                        productId: products[productKey]._id,
                                    };
                                }
                            break;
                            case 'price':
                            case 'number':
                                result = await ProductValueInt.findOne({productId: products[productKey]._id, attributeId: attributes[attributeKey].attributeId});
                                if(result) {
                                    _attributes[result.attributeCode] = {
                                        attributType: result.attributType,
                                        attributeId: result.attributeId,
                                        attributeCode: result.attributeCode,
                                        attributeGroupId: result.attributeGroupId,
                                        attributeGroup: result.attributeGroup,
                                        value: result.value,
                                        groupIndex: result.groupIndex,
                                        _id: result._id,
                                        productId: products[productKey]._id,
                                    };
                                }
                            break;
                            case 'boolean':
                                result = await ProductValueBoolean.findOne({productId: products[productKey]._id, attributeId: attributes[attributeKey].attributeId});
                                if(result) {
                                    _attributes[result.attributeCode] = {
                                        attributType: result.attributType,
                                        attributeId: result.attributeId,
                                        attributeCode: result.attributeCode,
                                        attributeGroupId: result.attributeGroupId,
                                        attributeGroup: result.attributeGroup,
                                        value: result.value,
                                        groupIndex: result.groupIndex,
                                        _id: result._id,
                                        productId: products[productKey]._id,
                                    };
                                }
                            break;
                            case 'select':
                                result = await ProductValueText.findOne({productId: products[productKey]._id, attributeId: attributes[attributeKey].attributeId});
                                if(result) {
                                    _attributes[result.attributeCode] = {
                                        attributType: result.attributType,
                                        attributeId: result.attributeId,
                                        attributeCode: result.attributeCode,
                                        attributeGroupId: result.attributeGroupId,
                                        attributeGroup: result.attributeGroup,
                                        value: result.value,
                                        groupIndex: result.groupIndex,
                                        _id: result._id,
                                        productId: products[productKey]._id,
                                    };
                                }
                            case 'multiselect':
                                const _selected = [];
                                resultAll = await ProductValueText.find({productId: products[productKey]._id, attributeId: attributes[attributeKey].attributeId});
                                for(let selectKey in resultAll) {
                                    _selected.push(resultAll[selectKey].value);
                                }
                                result = await ProductValueText.findOne({productId: products[productKey]._id, attributeId: attributes[attributeKey].attributeId});
                                if(result) {
                                    _attributes[result.attributeCode] = {
                                        attributType: result.attributType,
                                        attributeId: result.attributeId,
                                        attributeCode: result.attributeCode,
                                        attributeGroupId: result.attributeGroupId,
                                        attributeGroup: result.attributeGroup,
                                        value: _selected,
                                        groupIndex: result.groupIndex,
                                        _id: result._id,
                                        productId: products[productKey]._id,
                                    };
                                }
                            case 'checkbox':
                                result = await ProductValueText.findOne({productId: products[productKey]._id, attributeId: attributes[attributeKey].attributeId});
                                if(result) {
                                    _attributes[result.attributeCode] = {
                                        attributType: result.attributType,
                                        attributeId: result.attributeId,
                                        attributeCode: result.attributeCode,
                                        attributeGroupId: result.attributeGroupId,
                                        attributeGroup: result.attributeGroup,
                                        value: result.value.split(","),
                                        groupIndex: result.groupIndex,
                                        _id: result._id,
                                        productId: products[productKey]._id,
                                    };
                                }
                            case 'radio':
                                result = await ProductValueText.findOne({productId: products[productKey]._id, attributeId: attributes[attributeKey].attributeId});
                                if(result){
                                    _attributes[result.attributeCode] = {
                                        attributType: result.attributType,
                                        attributeId: result.attributeId,
                                        attributeCode: result.attributeCode,
                                        attributeGroupId: result.attributeGroupId,
                                        attributeGroup: result.attributeGroup,
                                        value: result.value,
                                        groupIndex: result.groupIndex,
                                        _id: result._id,
                                        productId: products[productKey]._id,
                                    };
                                }
                            break;
                            default:
                            break;
                        }
                    }
                    _attributeGroup.push({
                        attributeGroupId: attributeGroups[attributeGroupKey].attributeGroupId,
                        attributeGroup: attributeGroups[attributeGroupKey].attributeGroup,
                        attributes: _attributes
                    });
                }
                _products.push({
                    _id: products[productKey]._id,
                    categories: products[productKey].categories,
                    attributeset: products[productKey].attributeset,
                    images: products[productKey].images,
                    ratings: products[productKey].ratings,
                    numOfReviews: products[productKey].numOfReviews,
                    user: products[productKey].user,
                    status: products[productKey].status,
                    createdAt: products[productKey].createdAt,
                    reviews: products[productKey].reviews,
                    url_key: products[productKey].url_key,
                    url_path: products[productKey].url_path,
                    data: _attributeGroup
                });
            }        
        }
        return _products;
    } catch (error) {
        console.log(error)
    }
}

module.exports = { getproductDetailsWithAttributes };