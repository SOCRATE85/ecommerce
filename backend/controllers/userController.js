const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const cloudinary = require("cloudinary");

//Register a User
exports.registerUser = catchAsyncError(async (req, res) => {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatar",
        width: 150,
        crop: "scale"
    });

    const {name, email, password} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }
    });

    sendToken(user, 201, res);
});

//Register a User
exports.registerUserbyAdmin = catchAsyncError(async (req, res) => {
    const {name, email, password, image, status, role} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        image,
        role,
        status
    });

    sendToken(user, 201, res);
});

//Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    //checking if user has given password and email both
    if(!email || !password){
        return next(new ErrorHandler("Please enter Email & Password", 400));
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid email or password", 401));
    }
   
    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password", 401));
    }
    
    sendToken(user, 200, res);
});

//Log out User
exports.logoutUser = catchAsyncError(async (_req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: "Logged Out successfully"
    });
});

//Forget Password
exports.forgetPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({email: req.body.email});
    if(!user){
        return next(new ErrorHandler("User not Found", 401));
    }

    //Get ResetPassord Token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;
    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it`;

    try {
        await sendEmail({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message
        });
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`
        });
    }catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500));
    }
});

exports.resetPassword = catchAsyncError(async (req, res, next) => {
    //creating token hash
    const resetPasswordToken = crypto
                                    .createHash("sha256")
                                    .update(req.params.token)
                                    .digest("hex");
    
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if(!user){
        return next(new ErrorHandler("Reset Password Token is invalid or has been expire", 404));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does not password", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    sendToken(user, 200, res);
});

// get logged in user details
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    
    if(!user){
        return next(new ErrorHandler("User not Found", 404));
    }

    res.status(200).json({
        success: true,
        user
    })
});

//update User password
exports.updatePassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");
    
    if(!user){
        return next(new ErrorHandler("User not Found", 404));
    }

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Old password is incorrect", 400));
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("password does not match", 400));
    }

    user.password = req.body.newPassword;

    await user.save();
    sendToken(user, 200, res);
});

//update User Profile
exports.updateProfile = catchAsyncError(async (req, res, _next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    };

    if(req.body.avatar !== ''){
        const user = await User.findById(req.user.id);
        const imageId = user.avatar.public_id;
        await cloudinary.v2.uploader.destroy(imageId);
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatar",
            width: 150,
            crop: "scale"
        });

        newUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        };
    }

    // we will add cloudinary api later to upload image
    const updatedUser = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        user: updatedUser
    })
});

//update User -- Admin
exports.updateUserRole = catchAsyncError(async (req, res, _next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    };

    // we will add cloudinary api later to upload image
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        user
    })
});

//Get All Users -- Admin
exports.getAllUser = catchAsyncError(async (_req, res, _next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        users
    })
});

//Get User Details -- Admin
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler(`User not Found with Id ${req.params.id}`, 400));
    }
    res.status(200).json({
        success: true,
        user
    })
});

//Delete User -- Admin
exports.deleteUser = catchAsyncError(async (req, res, next) => {
    // we will remove cloudinary api later to upload image
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not exists with Id ${req.params.id}`, 404));
    }
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);
    await user.remove();
    res.status(200).json({
        success: true,
        message: "User Deleted successfully."
    })
});

