const Category = require("../models/categoryModel");
const Product = require("../models/productModel");
const Settings = require("../models/settingsModel");
const cloudinary = require("cloudinary");
const ProductValueText = require("../models/productValueTextModel");
const ProductValueInt = require("../models/productValueIntModel");
const ProductValueBoolean = require("../models/productValueBooleanModel");
const Attribute = require("../models/attributeModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const { getproductDetailsWithAttributes } = require("../utils/productAttribute");

// build sub category
const buildAncestors = catchAsyncError(async (id, parent_id) => {
    let ancest = [];
    let parent_category = await Category.findOne(
            { "_id": parent_id }, 
            { "name": 1, "slug": 1, "ancestors": 1}
        ).exec();
    if(parent_category) {
        const { _id, name, slug } = parent_category;
        ancest = [...parent_category.ancestors];
        ancest.unshift({ _id, name, slug });
        await Category.findByIdAndUpdate(id, {
            $set: { ancestors: ancest }
        })
    }
});

//create new category
exports.createCategory = catchAsyncError(async (req, res, _next) => {
    let images = [];

    if(typeof req.body.images === "string") {
        images.push(req.body.images);
    }else{
        images = req.body.images;
    }
    
    if(req.body.parent === '') {
        req.body.parent = null;
    }
    
    let imagesLink = [];
    
    for (let index = 0; index < images.length; index++) {
        const result = await cloudinary.v2.uploader.upload(images[index],{
            folder: "category"
        });
        imagesLink.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }

    req.body.images = imagesLink;
    if(req.body.products !== undefined){
        req.body.products = req.body.products.split(",").map(product =>{
            return product
        });
    }else{
        req.body.products = [];
    }

    const objCategory = new Category(req.body);
    const category = await objCategory.save();
    if(req.body.parent) {
        buildAncestors(category._id, req.body.parent ? req.body.parent : null );
    }
    res.status(201).json({
        success: true,
        category
    });
});

class Tree {
    constructor() {
        this._root = [];
        this.results = [];
    }
    
    _traverse(callback) {
        const self = this;
        function goThrough(node) {
            callback(node);       
            if(node.children !== undefined){ 
                node.children.forEach((child) => {
                    goThrough(child);
                });
            }
        }

        goThrough(this._root, self);
    }

    _addNode(results, parent = null) {
        this.results = results;
        if(parent === null) {
            results.forEach((result) => {            
                if(result.parent === null) {
                    this._root.push({
                        _id: result._id,
                        name: result.name,
                        slug: result.slug,
                        parent: result.parent,
                        children: []
                    });
                } else {           
                    this._traverse((nodes) => {      
                        nodes.forEach((node) => {
                            if(node._id.toString() === result.parent.toString()) {
                                const childData = this._addNode(this.results, result._id);
                                node.children.push({
                                    _id: result._id,
                                    name: result.name,
                                    slug: result.slug,
                                    parent: result.parent,
                                    children: childData !== undefined ? childData : []
                                });                            
                            }
                        });                
                    });
                }
            }) 
        }else {
            const childrenData = [];
            results.forEach(result => {
                if(result.parent !== null && (result.parent.toString() === parent.toString())){
                    const childData = this._addNode(this.results, result._id);
                    childrenData.push({
                        _id: result._id,
                        name: result.name,
                        slug: result.slug,
                        parent: result.parent,
                        children: childData !== undefined ? childData : []
                    });
                }
            });
            return childrenData;
        }       
    }

    _displayLeafs() {        
        return this._root;
    }
}

// display All category 
exports.getCategoriesFormFrontEnd = catchAsyncError( async (_req, res, _next) => { 
    const result = await Category.find()
                                .select(
                                    {
                                        "_id": true, 
                                        "name": true, 
                                        "slug": true,
                                        "parent": true,
                                        "ancestors": true
                                    })
                                .exec();
    
    const tree = new Tree();
    tree._addNode(result);
    
    res.status(201).json({
        success: true,
        categories: tree._displayLeafs()
    });
});

// get list of all categories
exports.getAllCategories = catchAsyncError(async (_req, res, _next) => {
    const categories = await Category.find();
    
    res.status(201).json({
        success: true,
        categories
    });
});

// delete category
exports.deleteCategory = catchAsyncError( async (req, res, next ) => {
    const category = await Category.findById(req.params.id);
    if(!category){
        return next(new ErrorHandler("Category not Found", 404));
    }

    // delete image from coudinary
    for (let i = 0; i < category.images.length; i++) {
        await cloudinary.v2.uploader.destroy(category.images[i].public_id);
    }

    await category.remove();
    res.status(200).json({
        success: true,
        message: "Category deleted successfully"
    });
});

// update category
exports.updateCategory = catchAsyncError(async (req, res, next) => {
    let category = await Category.findById(req.params.id);
    if(!category){
        return next(new ErrorHandler("Category not Found", 404));
    }
    if(req.body.parent === '') {
        req.body.parent = null;
    }
    // images start here
    let images = [];

    if(typeof req.body.images === "string") {
        images.push(req.body.images);
    }else{
        images = req.body.images;
    }
    
    /*if(images !== undefined) {
        for (let i = 0; i < category.images.length; i++) {
            await cloudinary.v2.uploader.destroy(category.images[i].public_id);
        }

        let imagesLink = [];

        for (let index = 0; index < images.length; index++) {
            const result = await cloudinary.v2.uploader.upload(images[index],{
                folder: "category"
            });
            imagesLink.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }

        req.body.images = imagesLink;
    }*/

    if(req.body.products !== '') {
        let products = [];
        const productIds = req.body.products.split(",");
        for (let index = 0; index < productIds.length; index++) {
            products.push(productIds[index]);
        }
        req.body.products = products;
    } else {
        req.body.products = [];
    }

    category = await Category.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(201).json({
        success: true,
        category
    });
});

const getFilterAttributes = async (products) => {
    let filterVariable = { use_in_filter: {}, use_in_sorting: []};
    const newData = {...filterVariable};
    const newUseInFilter = {...newData['use_in_filter']};
    const newUseInSorting = [...newData['use_in_sorting']];
    for(let pKey in products) {
        const attributeGroup = products[pKey].data;
        for(let key in attributeGroup) {
            const attributes =  attributeGroup[key].attributes;            
            for(let key in attributes) {
                const attributeId = attributes[key].attributeId;
                const attribute = await Attribute.findById(attributeId);           
                if(attribute.use_in_filter) {
                    switch (attributes[key].attributType) {
                        case 'number':
                            if(newUseInFilter[`${attributes[key].attributeCode}-${attributes[key].attributType}-${attribute.frontend_label.replace(" ", "@")}`] === undefined) {
                                newUseInFilter[`${attributes[key].attributeCode}-${attributes[key].attributType}-${attribute.frontend_label.replace(" ", "@")}`] = [];
                            }
                            newUseInFilter[`${attributes[key].attributeCode}-${attributes[key].attributType}-${attribute.frontend_label.replace(" ", "@")}`].push({
                                attributType: attributes[key].attributType,
                                attribute_code: attributes[key].attributeCode,
                                value: attributes[key].value
                            });    
                        break;
                        case 'price':
                            if(newUseInFilter[`${attributes[key].attributeCode}-${attributes[key].attributType}-${attribute.frontend_label.replace(" ", "@")}`] === undefined) {
                                newUseInFilter[`${attributes[key].attributeCode}-${attributes[key].attributType}-${attribute.frontend_label.replace(" ", "@")}`] = [];
                            }
                            newUseInFilter[`${attributes[key].attributeCode}-${attributes[key].attributType}-${attribute.frontend_label.replace(" ", "@")}`].push({
                                attributType: attributes[key].attributType,
                                attribute_code: attributes[key].attributeCode,
                                value: attributes[key].value
                            });
                        break;
                        case 'select':
                        case 'multiselect':
                        case 'checkbox':
                        case 'radio':
                            if(newUseInFilter[`${attributes[key].attributeCode}-${attributes[key].attributType}-${attribute.frontend_label.replace(" ", "@")}`] === undefined) {
                                newUseInFilter[`${attributes[key].attributeCode}-${attributes[key].attributType}-${attribute.frontend_label.replace(" ", "@")}`] = [];
                            }
                            newUseInFilter[`${attributes[key].attributeCode}-${attributes[key].attributType}-${attribute.frontend_label.replace(" ", "@")}`] = {
                               attributType: attributes[key].attributType,
                               attribute_code: attributes[key].attributeCode,
                               value: attribute.attribute_options
                            };
                        break;
                        default:
                        break;
                    }
                                   
                }
                if(attribute.use_in_sorting) {                   
                    if(newUseInSorting !== undefined) {
                        const isExists = newUseInSorting.find(item => item === attributes[key].attributeCode);
                        if(!isExists) {
                            newUseInSorting.push(attributes[key].attributeCode);
                        }
                    }
                }
                newData['use_in_filter'] = newUseInFilter;
                newData['use_in_sorting'] = newUseInSorting;           
            }
        }
    }
    return newData;
}

exports.getFilterSortingRecord = catchAsyncError(async(req, res, next) => {
    const category = await Category.findById(req.params.id);
    if(!category){
        return next(new ErrorHandler("Category not Found", 404));
    }
    const products = await getproductDetailsWithAttributes(await Product.find({ categories : req.params.id }));
    const filterAttributes = await getFilterAttributes(products);
    let filterData = [];
    filterData.push({'ratings-number': [0,5]});
    for(let key in filterAttributes.use_in_filter) {
        const filter = filterAttributes.use_in_filter[key];
        const flags = key.split("-");
        switch (flags[1]) {
            case 'number':
                let tempValue = [];
                for(let tKey in filter) {
                    tempValue.push(filter[tKey].value);
                }
                if(filter.length > 1) {
                    const abc = {};
                    abc[key] = [Math.min.apply(null, tempValue), Math.max.apply(null, tempValue)];
                    filterData.push(abc);
                } else {
                    const abc = {};
                    abc[key] = [filter[0].value];
                    filterData.push(abc);
                }
            break;
            case 'price':
                let priceValue = [];
                for(let tKey in filter) {
                    priceValue.push(filter[tKey].value);
                }
                if(filter.length > 1) {
                    const abc = {};
                    abc[key] = [Math.min.apply(null, priceValue), Math.max.apply(null, priceValue)];
                    filterData.push(abc);
                } else {
                    const abc = {};
                    abc[key] = [filter[0].value];
                    filterData.push(abc);
                }
            break;
            case 'select':
            case 'multiselect':
            case 'checkbox':
            case 'radio':
                const abc = {};
                abc[key] = filter.value;
                filterData.push(abc);
            break;
            default:
            break;
        }
        
    }
    
    const settings = await Settings.find({path: { $regex: '.*catalog.*' }});

    res.status(200).json({
        success: true,
        category,
        products,
        settings,
        filterAttributes: filterAttributes,
        filtersorting: filterData
    });
});

const removeDuplicate = (productIds, product) => {
    const _productIds = productIds.find(item => item.toString() === product.toString());
    return _productIds;
}

exports.getCategoryDetailsForAdmin = catchAsyncError(async (req, res, next) => {
    const category = await Category.findById(req.params.id).populate("products").populate("parent");
    if(!category) {
        return next(new ErrorHandler("Category not Found", 404));
    }
    
    res.status(200).json({
        success: true,
        category
    });
});

// get category
exports.getCategory = catchAsyncError( async (req, res, next) => {
    const resultPerPage = parseInt(req.query.numofProduct);
    const pageNo = parseInt(req.query.page);
    let from = 0;
    let to = 0;
    const productCount = await Product.countDocuments();
    let products = [];
    const productIds = [];
    const category = await Category.findById(req.params.id).populate("parent");
    if(!category) {
        return next(new ErrorHandler("Category not Found", 404));
    }
    if(category.products.length !== 0) {
        if(req.query.filter) {
            for(let key in req.query) {
                const attribute = await Attribute.find({ attribute_code: key });
                let result = null;
                let handle = null;
                if(attribute.length > 0) {
                    switch(attribute[0].frontend_input) {
                        case 'text':
                            handle = req.query[key];
                            if(handle.gte === undefined) {
                                result = await ProductValueText.find({
                                    value: { $regex: `.*${handle.gte}.*`},
                                    attributType: key
                                });
                                result.forEach(async item => {
                                    const flag = removeDuplicate(productIds, item.productId);
                                    if(!flag) {
                                        const _product = await Product.findById(item.productId);
                                        if(_product) {
                                            productIds.push(item.productId.toString());
                                        }
                                    }
                                });
                            } else {
                                result = await ProductValueText.find({
                                    value: { $regex: `.*${handle}.*`},
                                    attributType: key
                                });
                                result.forEach(async item => {
                                    const flag = removeDuplicate(productIds, item.productId);
                                    if(!flag) {
                                        const _product = await Product.findById(item.productId);
                                        if(_product) {
                                            productIds.push(item.productId.toString());
                                        }
                                    }
                                });
                            }
                        case 'textarea':
                            handle = req.query[key];
                            if(handle.gte === undefined) {
                                result = await ProductValueText.find({
                                    value: { $regex: `.*${handle.gte}.*`},
                                    attributType: key
                                });
                                result.forEach(async item => {
                                    const flag = removeDuplicate(productIds, item.productId);
                                    if(!flag) {
                                        const _product = await Product.findById(item.productId);
                                        if(_product) {
                                            productIds.push(item.productId.toString());
                                        }
                                    }
                                });
                            } else {
                                result = await ProductValueText.find({
                                    value: { $regex: `.*${handle}.*`},
                                    attributType: key
                                });
                                result.forEach(async item => {
                                    const flag = removeDuplicate(productIds, item.productId);
                                    if(!flag) {
                                        const _product = await Product.findById(item.productId);
                                        if(_product) {
                                            productIds.push(item.productId.toString());
                                        }
                                    }
                                });
                            }
                        break;
                        case 'price':
                            const price = req.query[key];
                            result = await ProductValueInt.find({
                                value: { $gte: price.gte, $lte: price.lte },
                                attributType: key
                            });
                            result.forEach(async item => {
                                const flag = removeDuplicate(productIds, item.productId);
                                if(!flag) {
                                    const _product = await Product.findById(item.productId);
                                    if(_product) {
                                        productIds.push(item.productId.toString());
                                    }
                                }
                            });
                        case 'number':
                            const value = req.query[key];
                            result = await ProductValueInt.find({
                                value: { $gte: value.gte, $lte: value.lte },
                                attributType: key
                            });
                            result.forEach(async item => {
                                const flag = removeDuplicate(productIds, item.productId);
                                if(!flag) {
                                    const _product = await Product.findById(item.productId);
                                    if(_product) {
                                        productIds.push(item.productId.toString());
                                    }
                                }
                            });
                        break;
                        case 'boolean':
                            handle = req.query[key];
                            result = await ProductValueBoolean.find({ 
                                    value: handle,
                                    attributType: key
                                });
                            result.forEach(async item => {
                                const flag = removeDuplicate(productIds, item.productId);
                                if(!flag) {
                                    const _product = await Product.findById(item.productId);
                                    if(_product) {
                                        productIds.push(item.productId.toString());
                                    }
                                }
                            });
                        break;           
                        case 'select':
                            handle = req.query[key];
                            result = await ProductValueText.find({
                                value: { $regex: `.*${handle}.*`},
                                attributType: key
                            });
                            result.forEach(async item => {
                                const flag = removeDuplicate(productIds, item.productId);
                                if(!flag) {
                                    const _product = await Product.findById(item.productId);
                                    if(_product) {
                                        productIds.push(item.productId.toString());
                                    }
                                }
                            });
                        case 'multiselect':
                            handle = req.query[key];
                            result = await ProductValueText.find({
                                value: { $regex: `.*${handle}.*`},
                                attributType: key
                            });
                            result.forEach(async item => {
                                const flag = removeDuplicate(productIds, item.productId);
                                if(!flag) {
                                    const _product = await Product.findById(item.productId);
                                    if(_product) {
                                        productIds.push(item.productId.toString());
                                    }
                                }
                            });
                        case 'radio':
                            handle = req.query[key];
                            result = await ProductValueText.find({
                                value: { $regex: `.*${handle}.*`},
                                attributType: key
                            });
                            result.forEach(async item => {
                                const flag = removeDuplicate(productIds, item.productId);
                                if(!flag) {
                                    const _product = await Product.findById(item.productId);
                                    if(_product) {
                                        productIds.push(item.productId.toString());
                                    }
                                }
                            });
                        case 'checkbox':
                            handle = req.query[key];
                            result = await ProductValueText.find({
                                value: { $regex: `.*${handle}.*`},
                                attributType: key
                            });
                            result.forEach(async item => {
                                const flag = removeDuplicate(productIds, item.productId);
                                if(!flag) {
                                    const _product = await Product.findById(item.productId);
                                    if(_product) {
                                        productIds.push(item.productId.toString());
                                    }
                                }
                            });
                        break;
                        default:
                        break;
                    }
                }
            }
        } else {
            category.products.forEach(async product => {
                if(!removeDuplicate(productIds, product)) {
                    const _product = await Product.findById(product);
                    if(_product){
                        productIds.push(product.toString());
                    }
                }
            });
        }
        
        products = await getproductDetailsWithAttributes(await Product.find({ 
            _id: {$in: productIds},
            categories : req.params.id,
            status: 1
        })
        .skip(pageNo > 0 ? ((pageNo - 1) * resultPerPage) : 0)
        .limit(resultPerPage));
    }
    
    from = ((pageNo - 1) * resultPerPage) > 0 ? ((pageNo - 1) * resultPerPage) + 1 : 1;
    to =  (pageNo * resultPerPage) < productCount ? pageNo * resultPerPage : productCount;

    res.status(200).json({
        success: true,
        category,
        products,
        from,
        to,
        productCount,
        resultPerPage
    });
});
