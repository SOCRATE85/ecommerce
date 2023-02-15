const mongoose = require("mongoose");
const catchAsyncError = require("../middleware/catchAsyncError")

const productSchema = new mongoose.Schema({
    categories: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Category",
            required: [true, "Please select Product Category."]
        }
    ],
    attributeset: {
        type: mongoose.Schema.ObjectId,
        ref: "AttributeSet",
        required: true
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    url_key: {
        type: String,
        required: true
    },
    url_path: {
        type: String,
        required: true
    },
    ratings: {
        type: Number,
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: Number,
        default: 1,
        required: true,
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

productSchema.pre('save', catchAsyncError(async function(next) {
    this.updatedAt = Date.now();
    next();
}));

module.exports = mongoose.model("Product", productSchema);
