const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwtToken = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter Your Name."],
        maxlength: [30, "Name cannot exceed 30 charactors"],
        minlength: [4, "Name should have more than 4 charactors"]
    },
    email: {
        type: String,
        required: [true, "Please enter Your Email."],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid Email."]
    },
    password: {
        type: String,
        required: [true, "Please enter Your Password"],
        minlength: [8, "Pasword shound be greator than 8 charactors"],
        select: false
    },
    image: {
        type: String,
        required: [false, "Please select the images"],
        trim: true
    },
    avatar: {
        public_id: {
            type: String,
            required: false
        },
        url: {
            type: String,
            required: false
        }
    },
    role:{
        type: String,
        default: "user"
    },
    status: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    },
    resetPaswordToken: String,
    resetPasswordExpired: Date
})

userSchema.pre("save", async function(next){
    this.updatedAt = Date.now();
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

//JWT Token for login after create account
userSchema.methods.getJWTToken = function(){
    return jwtToken.sign({id:this._id},process.env.JWT_SCRETE,{
        expiresIn: process.env.JWT_EXPIRE
    });
};

// compare both password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

//Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function(){
    //Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");

    //Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto.createHash("sha256")
                                    .update(resetToken)
                                    .digest("hex");
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;
};

module.exports = mongoose.model("User", userSchema);
