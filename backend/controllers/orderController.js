const Order = require("../models/orderModel");
const Address = require("../models/addressSchema");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");

//Create new Order
exports.newOrder = catchAsyncError(async (req, res, _next) => {
    let { 
        shippingInfo, 
        orderItems, 
        paymentInfo, 
        itemsPrice, 
        taxPrice, 
        shippingPrice, 
        totalPrice 
    } = req.body;
    
    if(shippingInfo.addressId === 'newaddress') {
        const addressData = {
            firstname: shippingInfo.firstname,
            lastname: shippingInfo.lastname,
            address: shippingInfo.address,
            city: shippingInfo.city,
            state: shippingInfo.state,
            country: shippingInfo.country,
            pinCode: shippingInfo.pinCode,
            phoneNo: shippingInfo.phoneNo,
            user: req.user._id
        }
        const address = await Address.create(addressData);
        shippingInfo.addressId = address._id;
    }

    const order = await Order.create({
        shippingInfo, 
        orderItems, 
        paymentInfo, 
        itemsPrice, 
        taxPrice, 
        shippingPrice, 
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    });

    res.status(200).json({
        success: true,
        order
    })
});

//Get Single Order
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user","name email");
    if(!order){
        return next(new ErrorHandler("Order not found with this Id", 404))
    }
    res.status(200).json({
        success: true,
        order
    })
});

//Get logged in user Order
exports.myOrders = catchAsyncError(async (req, res, _next) => {
    const orders = await Order.find({ user: req.user.id});
    
    res.status(200).json({
        success: true,
        orders
    })
});

//Get All Orders -- Admin
exports.getAllOrders = catchAsyncError(async (_req, res, _next) => {
    const orders = await Order.find();

    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
});


//Update Order -- Admin
exports.updateOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("Order not found with Id", 404));
    }

    if(order.orderStatus === 'Delivered'){
        return next(new ErrorHandler("You have already delivered this order", 400));
    }

    if(req.body.status === 'Shipped') {
        order.orderItems.forEach(async (_order) => {
            await updateStock(_order.product, _order.quantity);
        });
    }

    order.orderStatus = req.body.status;
    if(req.body.status === 'Delivered'){
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: true });

    res.status(200).json({
        success: true,
        order
    })
});

async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    product.stock -= quantity;
    await product.save({ validateBeforeSave: true });
}

//Delete Order -- Admin
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("Order not found with Id", 404));
    }

    await order.remove()

    res.status(200).json({
        success: true
    })
});