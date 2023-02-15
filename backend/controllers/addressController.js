const Address = require("../models/addressSchema");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");

exports.validateAddress = catchAsyncError(async (req, res, _next) => {
    const userId = req.user.id;
    const _address = new Address({
        user: userId,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        pinCode: req.body.pinCode,
        phoneNo: req.body.phoneNo
    });
    
    const error = await _address.validateSync();
    console.log('error: ', error);
    res.status(200).json({
        success: true,
        error
    });
});

//Add New Address
exports.addNewAddress = catchAsyncError(async (req, res, _next) => {
    const userId = req.user.id;
    const address = await Address.create({
        user: userId,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        pinCode: req.body.pinCode,
        phoneNo: req.body.phoneNo,
        idDefault:false
    });
    res.status(200).json({
        success: true,
        address
    });
});

//update Address
exports.updateAddress = catchAsyncError(async (req, res, next) => {
    let address = await Address.findById(req.params.id);
    if(!address){
        return next(new ErrorHandler(`address not Found with Id ${req.params.id}`, 400));
    }
    address = await Address.findByIdAndUpdate(req.params.id, {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        pinCode: req.body.pinCode,
        phoneNo: req.body.phoneNo,
        idDefault:false
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        address
    });
});

//Delete Addresss
exports.deleteAddress = catchAsyncError(async (req, res, next) => {
    let address = await Address.findById(req.params.id);
    if(!address){
        return next(new ErrorHandler(`address not Found with Id ${req.params.id}`, 400));
    }
    
    await address.remove();
    res.status(200).json({
        success: true,
        message: "Address Deleted successfully."
    });
});

// get Address of users
exports.getAddress = catchAsyncError(async (req, res, next) => {
    let address = await Address.findById(req.params.id);
    if(!address){
        return next(new ErrorHandler(`address not Found with Id ${req.params.id}`, 400));
    }
    res.status(200).json({
        success: true,
        address
    });
});

// get Address of users
exports.getAllAddress = catchAsyncError(async (req, res, _next) => {
    let addresses = await Address.find({ user: req.user.id});
    res.status(200).json({
        success: true,
        addresses
    });
});
