const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.ObjectId, ref: "User", required: [true, "User date is required!"]},
    firstname: {type: String, required: [true, "First name is required!"]},
    lastname: {type: String, required: [true, "Last name is required!"]},
    address: {type: String, required: [true, "Address is required!"]},
    city: {type: String, required: [true, "City is required!"]},
    state: {type: String, required: [true, "State is required!"]},
    country: {type: String, required: [true, "Country is required!"]},
    pinCode: {type: String, required: [true, "Zip code is required!"]},
    phoneNo: {type: String, required: [true, "Phone number is required!"]},
    isDefault: {type: Boolean, required: false, default: false},
    isBillingAddress: {type: Boolean,required: false, default: false},
    isShippingAddress: {type: Boolean,required: false, default: false}
});

module.exports = mongoose.model("Address", addressSchema);
