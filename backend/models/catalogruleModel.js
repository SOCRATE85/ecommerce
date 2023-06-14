const mongoose = require("mongoose");

const catalogruleScheme = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "This is required"],
    },
    description: {
        type: String,
        required: [true, "This is required"],
    },
    from_date: {
        type: Date,
        required: [true, "This is required"],
        default: () => Date.now()
    },
    to_date: {
        type: Date,
        required: [true, "This is required"],
        default: () => Date.now()
    },
    is_active: {
        type: Boolean,
        required: [true, "This is required"],
        default: true
    },
    conditions_serialized: {
        type: String,
        required: [true, "This is required"],
    },
    stop_rules_processing: {
        type: Boolean,
        required: true
    },
    sort_order: {
        type: Number,
        required: true,
        default: 0
    },
    simple_action: {
        type: String,
        required: false
    },
    discount_amount: {
        type: Number,
        required: true,
        default: 0.000000
    }
});

module.exports = mongoose.model("Catalogrule", catalogruleScheme);
