const Product = require("../models/productModel");
const ProductValueText = require("../models/productValueTextModel");
const ProductValueInt = require("../models/productValueIntModel");
const ProductValueBoolean = require("../models/productValueBooleanModel");
const ProductValueImage = require("../models/productValueImageModel");
const ProductValueDate = require('../models/productValueDateModel');
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");
const AttributeSet = require('../models/attributesetModel');
const AttributeGroup = require("../models/attributegroupModel");
const Attribute = require("../models/attributeModel");
const Category = require("../models/categoryModel");
const cloudinary = require("cloudinary");
const {getproductDetailsWithAttributes} = require("../utils/productAttribute");
const slugify = require("../utils/slugify");

function removeDuplicates(arr) {
    return arr.filter((item, 
        index) => arr.indexOf(item) === index);
}

const updateCategoryProduct = async (productId, categories) => {
    const category = await Category.findById(categories);
    if(category.products) {
        let productIds = [];
        category.products.forEach(async item => {
            if(item.toString() !== productId.toString()) {
                const check = await Product.findById(item);
                if(check) {
                    productIds.push(item);
                }
            }           
        });
        productIds.push(productId);
        category.products = removeDuplicates(productIds);
        await category.save();
    }
}

//Create Product -- Admin
exports.createProduct = catchAsyncError(async (req, res, _next) => {
    let images = [];
    
    if(typeof req.body.images === "string") {
        images.push(req.body.images);
    }else{
        images = req.body.images;
    }
    
    const categories = JSON.parse(req.body.categories);
    if(categories) {
        let _categories = [];
        for(let _key in categories) {
            _categories.push(categories[_key].value);
        }
        req.body.categories = _categories; 
    }
 
    const formState = JSON.parse(req.body.data);
    let result = null;
    const formData = {};
    for(let key in req.body) {
        if(key !== 'data' && key !== 'images') {
            formData[key] = req.body[key];
        }
    }
    let imagesLink = [];    
    for(let key in images) {
        const result  = await cloudinary.v2.uploader.upload(images[key],{
                folder: "products"
        });        
        imagesLink.push({
            public_id: result.public_id,
            url: result.secure_url
        }); 
    }
    formData['user'] = req.user.id;
    formData["images"] = imagesLink;
    const slug = slugify(req.body.name);
    const url = await validateUrlForNewProduct(slug, req.params.id);
    formData["url_key"] = url;
    formData["url_path"] = slug;

    let product = await Product.create(formData);
    await updateCategoryProduct(product._id, req.body.categories);

    const attributeGroup = [];
    for(let fKey in formState) {
        const data = formState[fKey].attributes;
        const _attributes = {};
        let selectedValue = null;
        for(let key in data) {
            data[key]['productId'] = product._id;
            switch (data[key].attributType.trim()) {
                case 'text':
                case 'textarea':
                    result = await ProductValueText.create(data[key]);
                    if(result) {
                        _attributes[key] = {
                            attributType: data[key].elementType,
                            attributeId: data[key].attributeId,
                            attributeCode: key,
                            attributeGroupId: data[key].attributeGroupId,
                            attributeGroup: data[key].attributeGroup,
                            value: data[key].value,
                            groupIndex: fKey,
                            _id: result._id,
                            productId: product._id,
                        };
                    }
                break;
                case 'file':
                    let imageData = {...data[key]};
                    for(let iKey in images) {
                        imageData['value'] = images[iKey];                  
                        result = await ProductValueImage.create(imageData);
                        if(result) {
                            _attributes[key] = {
                                attributType: data[key].elementType,
                                attributeId: data[key].attributeId,
                                attributeCode: key,
                                attributeGroupId: data[key].attributeGroupId,
                                attributeGroup: data[key].attributeGroup,
                                value: data[key].value,
                                groupIndex: fKey,
                                _id: result._id,
                                productId: product._id,
                            };
                        }
                    }          
                break;
                case 'date':
                    result = await ProductValueDate.create(data[key]);
                    if(result) {
                        _attributes[key] = {
                            attributType: data[key].elementType,
                            attributeId: data[key].attributeId,
                            attributeCode: key,
                            attributeGroupId: data[key].attributeGroupId,
                            attributeGroup: data[key].attributeGroup,
                            value: data[key].value,
                            groupIndex: fKey,
                            _id: result._id,
                            productId: product._id,
                        };
                    }
                break;
                case 'price':
                case 'number':
                    result = await ProductValueInt.create(data[key]);
                    if(result) {
                        _attributes[key] = {
                            attributType: data[key].elementType,
                            attributeId: data[key].attributeId,
                            attributeCode: key,
                            attributeGroupId: data[key].attributeGroupId,
                            attributeGroup: data[key].attributeGroup,
                            value: data[key].value,
                            groupIndex: fKey,
                            _id: result._id,
                            productId: product._id,
                        };
                    }
                break;
                case 'boolean':
                    result = await ProductValueBoolean.create(data[key]);
                    if(result) {
                    _attributes[key] = {
                        attributType: data[key].elementType,
                        attributeId: data[key].attributeId,
                        attributeCode: key,
                        attributeGroupId: data[key].attributeGroupId,
                        attributeGroup: data[key].attributeGroup,
                        value: data[key].value,
                        groupIndex: fKey,
                        _id: result._id,
                        productId: product._id,
                    };
                    }
                break;
                case 'select':
                    selectedValue = data[key].value !== null ? data[key].value : [];
                    selectedData = {...data[key]};
                    selectedData['value'] = JSON.stringify(selectedValue);
                    result = await ProductValueText.create(selectedData);
                    if(result) {
                        _attributes[key] = {
                            attributType: data[key].elementType,
                            attributeId: data[key].attributeId,
                            attributeCode: key,
                            attributeGroupId: data[key].attributeGroupId,
                            attributeGroup: data[key].attributeGroup,
                            value: data[key].value,
                            groupIndex: fKey,
                            _id: result._id,
                            productId: product._id,
                        };
                    }
                break;
                case 'multiselect':
                    selectedValue = data[key].value !== null ? data[key].value : [];
                    selectedData = {...data[key]};
                    selectedData['value'] = JSON.stringify(selectedValue);
                    result = await ProductValueText.create(selectedData);
                    if(result) {
                        _attributes[key] = {
                            attributType: data[key].elementType,
                            attributeId: data[key].attributeId,
                            attributeCode: key,
                            attributeGroupId: data[key].attributeGroupId,
                            attributeGroup: data[key].attributeGroup,
                            value: data[key].value,
                            groupIndex: fKey,
                            _id: result._id,
                            productId: product._id,
                        };
                    }
                break;
                case 'checkbox':
                    const chkValue = {...data[key]};
                    chkValue['value'] =  data[key].value.join(",");
                    result = await ProductValueText.create(chkValue);
                    if(result) {
                        _attributes[key] = {
                            attributType: data[key].elementType,
                            attributeId: data[key].attributeId,
                            attributeCode: key,
                            attributeGroupId: data[key].attributeGroupId,
                            attributeGroup: data[key].attributeGroup,
                            value: data[key].value,
                            groupIndex: fKey,
                            _id: result._id,
                            productId: product._id,
                        };
                    }
                break;                  
                case 'radio':
                    result = await ProductValueText.create(data[key]);
                    if(result) {
                        _attributes[key] = {
                            attributType: data[key].elementType,
                            attributeId: data[key].attributeId,
                            attributeCode: key,
                            attributeGroupId: data[key].attributeGroupId,
                            attributeGroup: data[key].attributeGroup,
                            value: data[key].value,
                            groupIndex: fKey,
                            _id: result._id,
                            productId: product._id,
                        };
                    }
                break;        
                default:
                break;
            }      
        }
        attributeGroup.push({
            attributeGroupId: formState[fKey].attributeGroupId,
            attributeGroup: formState[fKey].attributeGroup,
            attributes: _attributes
        });
    }

    const resposeData = {
        categories: product.categories,
        attributeset: product.attributeset,
        ratings: product.ratings,
        numOfReviews: product.numOfReviews,
        user: product.user,
        status: product.status,
        createdAt: product.createdAt,
        _id: product._id,
        images: product.images,
        reviews: product.reviews,
        data: attributeGroup
    }
    
    res.status(201).json({
        success: true,
        product: resposeData
    });
});

const validateUrlForNewProduct = async (url_key, productId) => {
    const products = await Product.find({ url_key });
    const isValid = products.filter(item => item._id !== productId);
    if(isValid.length > 0) {
        return `${url_key}-${isValid.length}`;
    }
    return url_key;
}

const validateUrlForUpdatedProduct = async (url_path, productId, newUrl_key) => {
    if(url_path.trim() !== newUrl_key.trim()) {
        const products = await Product.find({ url_path });
        const isValid = products.filter(item => item._id !== productId);
        if(isValid.length > 0) {
            return `${url_path}-${isValid.length}`;
        }
    }
}

//Update Product -- Admin
exports.updateProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not Found", 404));
    }

    const categories = JSON.parse(req.body.categories);
    if(categories) {
        let _categories = [];
        for(let _key in categories) {
            _categories.push(categories[_key].value);
        }
        req.body.categories = _categories; 
    }

    // images start here
    let images = [];
    if(typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }
    const formState = JSON.parse(req.body.data);
    
    let result = null;
    let isExits = null;
    const formData = {};
    const slug = slugify(req.body.name);
    const url = await validateUrlForUpdatedProduct(product.url_path, req.params.id, slug);
    if(url) {
        formData["url_key"] = url;
    }
    for(let key in req.body) {
        if(key !== 'data' && key !== 'images' && key !== 'name') {
            formData[key] = req.body[key];
        }
    }

    if(images !== undefined) {
        // delete image from coudinary
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }
        let imagesLink = [];
        for (let index = 0; index < images.length; index++) {
            const result = await cloudinary.v2.uploader.upload(images[index],{
                folder: "products"
            });
            imagesLink.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }
        formData["images"] = imagesLink;
    }
    const attributeGroup = [];
    let selectedValue = null;
    let selectedData = null;
    for(let fKey in formState) {
        const data = formState[fKey].attributes;
        const _attributes = {};
        for(let key in data) {
            data[key]['productId'] = req.params.id;
            switch(data[key].attributType.trim()) {
                case 'text':
                case 'textarea':
                    isExits = await ProductValueText.findOne({
                        productId: req.params.id, 
                        attributeId: data[key].attributeId
                    });
                    if(isExits) {
                        await ProductValueText.findByIdAndUpdate(isExits._id, {
                            attributType: data[key].attributType,
                            attributeId: data[key].attributeId,
                            attributeCode: key,
                            attributeGroupId: data[key].attributeGroupId,
                            attributeGroup: data[key].attributeGroup,
                            value: data[key].value,
                            groupIndex: fKey,
                            productId: req.params.id,
                        });
                        _attributes[key] = {
                            attributType: data[key].attributType,
                            attributeId: data[key].attributeId,
                            attributeCode: key,
                            attributeGroupId: data[key].attributeGroupId,
                            attributeGroup: data[key].attributeGroup,
                            value: data[key].value,
                            groupIndex: fKey,
                            _id: isExits._id,
                            productId: req.params.id,
                        };
                    } else {
                        result = await ProductValueText.create(data[key]);
                        _attributes[key] = {
                            attributType: data[key].attributType,
                            attributeId: data[key].attributeId,
                            attributeCode: key,
                            attributeGroupId: data[key].attributeGroupId,
                            attributeGroup: data[key].attributeGroup,
                            value: data[key].value,
                            groupIndex: fKey,
                            _id: result._id,
                            productId: req.params.id,
                        };
                    }                    
                break;
                case 'file':
                    isExits = await ProductValueImage.find({
                        productId: req.params.id, 
                        attributeId: data[key].attributeId
                    });
                    if(isExits) {
                        for(let isKey in isExits) {
                            await ProductValueImage.findByIdAndDelete(isExits[isKey]._id);
                        }
                        let imageData = {...data[key]};
                        for(let iKey in images) {
                            imageData['value'] = images[iKey];
                            result = await ProductValueImage.create(imageData);
                            _attributes[key] = {
                                attributType: data[key].attributType,
                                attributeId: data[key].attributeId,
                                attributeCode: key,
                                attributeGroupId: data[key].attributeGroupId,
                                attributeGroup: data[key].attributeGroup,
                                value: data[key].value,
                                groupIndex: fKey,
                                _id: result._id,
                                productId: req.params.id,
                            };
                        }
                    }
                break;
                case 'date':
                    isExits = await ProductValueDate.findOne({
                        productId: req.params.id, 
                        attributeId: data[key].attributeId
                    });
                    if(isExits) {
                        await ProductValueDate.findByIdAndUpdate(isExits._id, {
                            attributType: data[key].attributType,
                            attributeId: data[key].attributeId,
                            attributeCode: key,
                            attributeGroupId: data[key].attributeGroupId,
                            attributeGroup: data[key].attributeGroup,
                            value: data[key].value,
                            groupIndex: fKey,
                            productId: req.params.id,
                        });
                        _attributes[key] = {
                            attributType: data[key].attributType,
                            attributeId: data[key].attributeId,
                            attributeCode: key,
                            attributeGroupId: data[key].attributeGroupId,
                            attributeGroup: data[key].attributeGroup,
                            value: data[key].value,
                            groupIndex: fKey,
                            _id: isExits._id,
                            productId: req.params.id,
                        };
                    } else {
                        result = await ProductValueDate.create(data[key]);
                        _attributes[key] = {
                            attributType: data[key].attributType,
                            attributeId: data[key].attributeId,
                            attributeCode: key,
                            attributeGroupId: data[key].attributeGroupId,
                            attributeGroup: data[key].attributeGroup,
                            value: data[key].value,
                            groupIndex: fKey,
                            _id: result._id,
                            productId: req.params.id,
                        };
                    }
                break;
                case 'boolean':
                    isExits = await ProductValueBoolean.findOne({
                        productId: req.params.id, 
                        attributeId: data[key].attributeId
                    });
                    if(isExits) {
                        await ProductValueBoolean.findByIdAndUpdate(isExits._id, {
                            attributType: data[key].attributType,
                            attributeId: data[key].attributeId,
                            attributeCode: key,
                            attributeGroupId: data[key].attributeGroupId,
                            attributeGroup: data[key].attributeGroup,
                            value: data[key].value,
                            groupIndex: fKey,
                            productId: req.params.id,
                        });
                        _attributes[key] = {
                            attributType: data[key].attributType,
                            attributeId: data[key].attributeId,
                            attributeCode: key,
                            attributeGroupId: data[key].attributeGroupId,
                            attributeGroup: data[key].attributeGroup,
                            value: data[key].value,
                            groupIndex: fKey,
                            _id: isExits._id,
                            productId: req.params.id,
                        };
                    } else {
                        result = await ProductValueBoolean.create(data[key]);
                        _attributes[key] = {
                            attributType: data[key].attributType,
                            attributeId: data[key].attributeId,
                            attributeCode: key,
                            attributeGroupId: data[key].attributeGroupId,
                            attributeGroup: data[key].attributeGroup,
                            value: data[key].value,
                            groupIndex: fKey,
                            _id: result._id,
                            productId: req.params.id,
                        };
                    }
                break;
                case 'price':
                case 'number':
                    isExits = await ProductValueInt.findOne({
                        productId: req.params.id, 
                        attributeId: data[key].attributeId
                    });
                    if(isExits) {
                        await ProductValueInt.findByIdAndUpdate(isExits._id, {
                            attributType: data[key].attributType,
                            attributeId: data[key].attributeId,
                            attributeCode: key,
                            attributeGroupId: data[key].attributeGroupId,
                            attributeGroup: data[key].attributeGroup,
                            value: data[key].value,
                            groupIndex: fKey,
                            productId: req.params.id,
                        });
                        _attributes[key] = {
                            attributType: data[key].attributType,
                            attributeId: data[key].attributeId,
                            attributeCode: key,
                            attributeGroupId: data[key].attributeGroupId,
                            attributeGroup: data[key].attributeGroup,
                            value: data[key].value,
                            groupIndex: fKey,
                            _id: isExits._id,
                            productId: req.params.id,
                        };
                    } else {
                        result = await ProductValueInt.create(data[key]);
                        _attributes[key] = {
                            attributType: data[key].attributType,
                            attributeId: data[key].attributeId,
                            attributeCode: key,
                            attributeGroupId: data[key].attributeGroupId,
                            attributeGroup: data[key].attributeGroup,
                            value: data[key].value,
                            groupIndex: fKey,
                            _id: result._id,
                            productId: req.params.id,
                        };
                    }
                break;
                case 'select':
                    selectedValue = data[key].value !== null ? data[key].value : [];
                    selectedData = {...data[key]};
                    isExits = await ProductValueText.findOne({
                        productId: req.params.id, 
                        attributeId: data[key].attributeId
                    });
                    if(isExits) {
                        await ProductValueText.findByIdAndUpdate(isExits._id, {
                            attributType: data[key].attributType,
                            attributeId: data[key].attributeId,
                            attributeCode: key,
                            attributeGroupId: data[key].attributeGroupId,
                            attributeGroup: data[key].attributeGroup,
                            value: JSON.stringify(data[key].value),
                            groupIndex: fKey,
                            productId: req.params.id,
                        });
                        _attributes[key] = {
                            attributType: data[key].attributType,
                            attributeId: data[key].attributeId,
                            attributeCode: key,
                            attributeGroupId: data[key].attributeGroupId,
                            attributeGroup: data[key].attributeGroup,
                            value: data[key].value,
                            groupIndex: fKey,
                            _id: isExits._id,
                            productId: req.params.id,
                        };
                    } else {
                        selectedData['value'] = JSON.stringify(selectedValue);
                        result = await ProductValueText.create(selectedData);
                        _attributes[key] = {
                            attributType: data[key].attributType,
                            attributeId: data[key].attributeId,
                            attributeCode: key,
                            attributeGroupId: data[key].attributeGroupId,
                            attributeGroup: data[key].attributeGroup,
                            value: data[key].value,
                            groupIndex: fKey,
                            _id: result._id,
                            productId: req.params.id,
                        };
                    }
                break;
                case 'multiselect':
                    selectedValue = data[key].value !== null ? data[key].value : [];
                    selectedData = {...data[key]};
                    isExits = await ProductValueText.findOne({
                        productId: req.params.id, 
                        attributeId: data[key].attributeId
                    });
                    if(isExits) {
                        await ProductValueText.findByIdAndUpdate(isExits._id, {
                            attributType: data[key].attributType,
                            attributeId: data[key].attributeId,
                            attributeCode: key,
                            attributeGroupId: data[key].attributeGroupId,
                            attributeGroup: data[key].attributeGroup,
                            value: JSON.stringify(data[key].value),
                            groupIndex: fKey,
                            productId: req.params.id,
                        });
                        _attributes[key] = {
                            attributType: data[key].attributType,
                            attributeId: data[key].attributeId,
                            attributeCode: key,
                            attributeGroupId: data[key].attributeGroupId,
                            attributeGroup: data[key].attributeGroup,
                            value: data[key].value,
                            groupIndex: fKey,
                            _id: isExits._id,
                            productId: req.params.id,
                        };
                    } else {
                        selectedData['value'] = JSON.stringify(selectedValue);
                        result = await ProductValueText.create(selectedData);
                        _attributes[key] = {
                            attributType: data[key].attributType,
                            attributeId: data[key].attributeId,
                            attributeCode: key,
                            attributeGroupId: data[key].attributeGroupId,
                            attributeGroup: data[key].attributeGroup,
                            value: data[key].value,
                            groupIndex: fKey,
                            _id: result._id,
                            productId: req.params.id,
                        };
                    }
                break;
                case 'checkbox':
                    isExits = await ProductValueText.findOne({
                        productId: req.params.id, 
                        attributeId: data[key].attributeId
                    });
                    if(isExits) {
                        await ProductValueText.findByIdAndUpdate(isExits._id, {
                            attributType: data[key].elementType,
                            attributeId: data[key].attributeId,
                            attributeCode: key,
                            attributeGroupId: data[key].attributeGroupId,
                            attributeGroup: data[key].attributeGroup,
                            value: data[key].value.join(","),
                            groupIndex: fKey,
                            productId: req.params.id,
                        });
                        _attributes[key] = {
                            attributType: data[key].elementType,
                            attributeId: data[key].attributeId,
                            attributeCode: key,
                            attributeGroupId: data[key].attributeGroupId,
                            attributeGroup: data[key].attributeGroup,
                            value: data[key].value,
                            groupIndex: fKey,
                            _id: isExits._id,
                            productId: req.params.id,
                        };
                    } else {
                        const chkValue = {...data[key]};
                        chkValue['value'] = data[key].value.join(",");
                        result = await ProductValueText.create(chkValue);
                        _attributes[key] = {
                            attributType: data[key].elementType,
                            attributeId: data[key].attributeId,
                            attributeCode: key,
                            attributeGroupId: data[key].attributeGroupId,
                            attributeGroup: data[key].attributeGroup,
                            value: data[key].value,
                            groupIndex: fKey,
                            _id: result._id,
                            productId: req.params.id,
                        };
                    }
                break;
                case 'radio':
                    isExits = await ProductValueText.findOne({
                        productId: req.params.id, 
                        attributeId: data[key].attributeId
                    });
                    if(isExits) {
                        await ProductValueText.findByIdAndUpdate(isExits._id, {
                            attributType: data[key].elementType,
                            attributeId: data[key].attributeId,
                            attributeCode: key,
                            attributeGroupId: data[key].attributeGroupId,
                            attributeGroup: data[key].attributeGroup,
                            value: data[key].value,
                            groupIndex: fKey,
                            productId: req.params.id,
                        });
                        _attributes[key] = {
                            attributType: data[key].elementType,
                            attributeId: data[key].attributeId,
                            attributeCode: key,
                            attributeGroupId: data[key].attributeGroupId,
                            attributeGroup: data[key].attributeGroup,
                            value: data[key].value,
                            groupIndex: fKey,
                            _id: isExits._id,
                            productId: req.params.id,
                        };
                    } else {
                        result = await ProductValueText.create(data[key]);
                        _attributes[key] = {
                            attributType: data[key].elementType,
                            attributeId: data[key].attributeId,
                            attributeCode: key,
                            attributeGroupId: data[key].attributeGroupId,
                            attributeGroup: data[key].attributeGroup,
                            value: data[key].value,
                            groupIndex: fKey,
                            _id: result._id,
                            productId: req.params.id,
                        };
                    }
                break;
                default:
                break;
            }
        }
        attributeGroup.push({
            attributeGroupId: formState[fKey].attributeGroupId,
            attributeGroup: formState[fKey].attributeGroup,
            attributes: _attributes
        });
    }
    product = await Product.findByIdAndUpdate(req.params.id, formData,{
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    await updateCategoryProduct(req.params.id, req.body.categories);
    const resposeData = {
        categories: product.categories,
        attributeset: product.attributeset,
        ratings: product.ratings,
        numOfReviews: product.numOfReviews,
        user: product.user,
        status: product.status,
        createdAt: product.createdAt,
        _id: product._id,
        images: product.images,
        reviews: product.reviews,
        data: attributeGroup
    }
    res.status(201).json({
        success: true,
        product: resposeData
    });
});

//Get All Products
exports.getAllProducts = catchAsyncError(async (_req, res, _next) => {
    const _products = await getproductDetailsWithAttributes(await Product.find().populate('attributeset').populate("categories"));
    res.status(200).json({
        success: true, 
        products: _products
    });
});

//Get All Products (Admin)
exports.getAdminProducts = catchAsyncError(async (_req, res, _next) => {
    const _products = await getproductDetailsWithAttributes(await Product.find().populate('attributeset').populate("categories"));
    res.status(200).json({
        success: true, 
        products: _products
    });
});

const removeProductIdFromCategory = async (productId, categories) => {
    const category = await Category.findById(categories);
    if(category.products) {
        const afterRemove = category.products.filter(item => item.product !== productId);
        category.products = afterRemove;
        await category.save();
    } 
}

//Delete Product
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not Found", 404));
    }

    // delete image from coudinary
    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }
    
    const _productValueText = await ProductValueText.find({ productId: req.params.id });
    if(_productValueText) {
        _productValueText.forEach(async(item) => {
            await item.remove();
        });
    }
    const _productValueInt = await ProductValueInt.find({ productId: req.params.id });
    if(_productValueInt) {
        _productValueInt.forEach(async(item) => {
            await item.remove();
        });
    }
    const _productValueBoolean = await ProductValueBoolean.find({ productId: req.params.id });
    if(_productValueBoolean) {
        _productValueBoolean.forEach(async(item) => {
            await item.remove();
        });
    }
    const _productValueImage = await ProductValueImage.find({ productId: req.params.id });
    if(_productValueImage) {
        _productValueImage.forEach(async(item) => {
            await item.remove();
        });
    }
    const _productValueDate = await ProductValueDate.find({ productId: req.params.id });
    if(_productValueDate) {
        _productValueDate.forEach(async(item) => {
            await item.remove();
        });
    }
    await removeProductIdFromCategory(req.params.id, product.categories);
    await product.remove();
    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    });
})

//Get Single Product
exports.getProductDetails = catchAsyncError(async (req, res) => {
    const product = await Product.findById(req.params.id).populate('categories').populate('attributeset');
    if(!product){
        return next(new ErrorHandler("Product not Found", 404));
    }
    let _product = {};
    let resultAll = null;
    const attributesetId = product.attributeset;
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
                switch (attribute.frontend_input) {
                    case 'text':
                    case 'textarea':
                        result = await ProductValueText.findOne({productId: product._id, attributeId: attributes[attributeKey].attributeId});
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
                                productId: product._id,
                            };
                        }
                    break;
                    case 'file':
                        const _images = [];
                        resultAll = await ProductValueImage.find({productId: product._id, attributeId: attributes[attributeKey].attributeId});
                        for(let imageKey in resultAll) {
                            _images.push(resultAll[imageKey].value);
                        }
                        result = await ProductValueImage.findOne({productId: product._id, attributeId: attributes[attributeKey].attributeId});
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
                                productId: product._id,
                            };
                        }
                    break;
                    case 'date':
                        result = await ProductValueDate.findOne({productId: product._id, attributeId: attributes[attributeKey].attributeId});
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
                                productId: product._id,
                            };
                        }
                    break;
                    case 'boolean':
                        result = await ProductValueBoolean.findOne({productId: product._id, attributeId: attributes[attributeKey].attributeId});
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
                                productId: product._id,
                            };
                        }
                    break;
                    case 'price':
                    case 'number':
                        result = await ProductValueInt.findOne({productId: product._id, attributeId: attributes[attributeKey].attributeId});
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
                                productId: product._id,
                            };
                        }                        
                    break;
                    case 'select':
                        result = await ProductValueText.findOne({productId: product._id, attributeId: attributes[attributeKey].attributeId});
                        if(result) {
                            _attributes[result.attributeCode] = {
                                attributType: result.attributType,
                                attributeId: result.attributeId,
                                attributeCode: result.attributeCode,
                                attributeGroupId: result.attributeGroupId,
                                attributeGroup: result.attributeGroup,
                                value: JSON.parse(result.value),
                                groupIndex: result.groupIndex,
                                _id: result._id,
                                productId: product._id,
                            };
                        }
                    break;
                    case 'multiselect':
                        result = await ProductValueText.findOne({productId: product._id, attributeId: attributes[attributeKey].attributeId});
                        if(result) {
                            _attributes[result.attributeCode] = {
                                attributType: result.attributType,
                                attributeId: result.attributeId,
                                attributeCode: result.attributeCode,
                                attributeGroupId: result.attributeGroupId,
                                attributeGroup: result.attributeGroup,
                                value: JSON.parse(result.value),
                                groupIndex: result.groupIndex,
                                _id: result._id,
                                productId: product._id,
                            };
                        }
                    break;
                    case 'checkbox':
                        result = await ProductValueText.findOne({productId: product._id, attributeId: attributes[attributeKey].attributeId});
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
                                productId: product._id,
                            };
                        }
                    break;
                    case 'radio':
                        result = await ProductValueText.findOne({productId: product._id, attributeId: attributes[attributeKey].attributeId});
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
                                productId: product._id,
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
        const categories = product.categories;
        let _options = [];
        for(let key in categories) {
            _options.push({label: categories[key].name, value: categories[key]._id});
        }
        _product = {
            _id: product._id,
            categories: _options,
            attributeset: {
                label: product.attributeset.attribute_set_name,
                value: product.attributeset._id
            },
            url_key: product.url_key,
            url_path: product.url_path,
            images: product.images,
            ratings: product.ratings,
            numOfReviews: product.numOfReviews,
            user: product.user,
            status: product.status,
            createdAt: product.createdAt,
            reviews: product.reviews,
            data: _attributeGroup
        };
    }        

    res.status(200).json({
        success: true,
        product: _product
    });
});

//Create new Review and Update the Review
exports.createProductReview = catchAsyncError(async (req, res, _next) => {
    const { rating, comment, productId } = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString());

    if(isReviewed){
        product.reviews.forEach(rev => {
            if(rev.user.toString() === req.user._id.toString()){
                (rev.rating = rating),(rev.comment = comment);
            }
        });
    }else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avg_rating = 0;
    product.reviews.forEach(rev => {
        avg_rating = avg_rating + rev.rating;
    });
    
    product.ratings = avg_rating / product.reviews.length;
    
    await product.save({ validateBeforeSave : true });
    res.status(200).json({
        success: true
    });
});

//Get All Reviews of a product
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
    if(!product){
        return next(new ErrorHandler("Product not Found", 404));
    }
    res.status(200).json({
        success: true,
        reviews: product.reviews
    });
});

//Delete Review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
    
    if(!product){
        return next(new ErrorHandler("Product not Found", 404));
    }

    const reviews = product.reviews.filter(rev => rev._id.toString() !== req.query.id.toString());

    let avg_rating = 0;
    reviews.forEach(rev => {
        avg_rating = avg_rating + rev.rating;
    });
    
    let ratings = 0;
    if (reviews.length === 0) {
        ratings = 0;
    } else {
        ratings = avg_rating / reviews.length;
    }
    
    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    },{
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true
    });
});
