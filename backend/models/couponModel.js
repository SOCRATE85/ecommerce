const mongoose = require("mongoose");

const couponScheme = new mongoose.Schema({
    cartruleId: {
        type: mongoose.Schema.ObjectId,
        ref: "Cartrule",
        required: true
    },
    couponlength: {
        type: Number,
        required: true,
        default: 12
    },
    codeformat: {
        type: String,
        required: true
    },
    codeprefix: {
        type: String,
        required: false
    },
    codesuffix: {
        type: String,
        required: false
    },
    dashaftereverychar: {
        type: Number,
        default: 0
    },
    used: {
        type: Number,
        default: 0
    },
    used_time: {
        type: Date,
        required: false
    },
    createdAt: {
        type: Date,
        required: true,
        immutable: true,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        required: true,
        default: () => Date.now()
    }
});

module.exports = mongoose.model("Cartrule", couponScheme);
