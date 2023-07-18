const mongoose = require("mongoose");

const cartRuleScheme = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "This is required"],
    },
    description: {
        type: String,
        required: [true, "This is required"],
    },
    coupon: {
        type: Number,
        required: [false, "This is required"]
    },
    couponcode: {
        type: String,
        required: [false, "This is required"]
    },
    usepercoupon: {
        type: Number,
        required: false
    },
    usepercustomer: {
        type: Number,
        required: false
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
    discount_qty: {
        type: Number,
        required: false
    },
    discount_step: {
        type: Number,
        required: false,
        maxLength: 255
    },
    discount_amount: {
        type: Number,
        required: true,
        default: 0.000000
    },
    applyonshippingamount: {
        type: Boolean,
        default: false
    },
    coupons: [
        {
            code: {
                type: String,
                required: true
            },
            usage_limit: {
                type: Number,
                required: true
            },
            usage_per_customer: {
                type: Number,
                required: true
            },
            times_used: {
                type: Number,
                required: true
            },
            expiration_date: {
                type: Date,
                required: true
            },
            is_primary: {
                type: Number,
                required: true
            },
            created_at: {
                type: Date,
                required: true,
                immutable: true,
                default: () => Date.now()
            },
            type: {
                type: Number,
                required: true
            },
            generated_by_dotmailer: {
                type: Number,
                required: true
            }
        }
    ]
});

module.exports = mongoose.model("Cartrule", cartRuleScheme);
