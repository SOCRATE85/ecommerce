const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwtToken = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncError(async (req, _res , next) => {
    const { token } = req.cookies;
    if(!token){
        return next(new ErrorHandler("Please login to access this resource", 401));
    }
    const decodeedData = jwtToken.verify(token, process.env.JWT_SCRETE);

    req.user = await User.findById(decodeedData.id);

    next();
});

exports.authorizeRole = (...roles) => {
    return (req, _res, next) => {
         if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource.`, 403));
         }

         next();
    };
};