const mongoose = require("mongoose");

const productValueDateSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true
    },
    attributType: {
        type: String,
        required: true,
    },
    attributeId: {
        type: mongoose.Schema.ObjectId,
        ref:"Attributes",
        required: true,
    },
    attributeCode: {
        type: String,
        required: true,
    },
    attributeGroup: {
        type: String
    },
    attributeGroupId: {
        type: mongoose.Schema.ObjectId,
        ref:"AttributeGroup",
        required: true,
    },
    groupIndex: {
        type: Number,
        required: true,
    },
    value: {
        type: Date,
    }
});

module.exports = mongoose.model("ProductValueDate", productValueDateSchema);