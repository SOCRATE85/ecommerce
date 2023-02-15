const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, _req, res, _next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internam Server Error";

    //Wrong MongoDb ID error
    if(err.name === 'CastError'){
        const message = `Resource not found. Invalid ${err.path} ${err.message}`;
        err = new ErrorHandler(message, 400);
    }

    //Wrong JWT error
    if(err.name === 'JsonWebTokenError'){
        const message = `Json Web Token is invalid, try again`;
        err = new ErrorHandler(message, 400);
    }
    
    //JWT Expire error
    if(err.name === 'TokenExpiredError'){
        const message = `Json Web Token is invalid, try again`;
        err = new ErrorHandler(message, 400);
    }

    //Mongoose duplicate key error
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Enter`;
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
}