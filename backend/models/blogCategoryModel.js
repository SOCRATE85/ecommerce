const mongoose = require("mongoose");
const catchAsyncError = require("../middleware/catchAsyncError");

const blogCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    posts: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "BlogPosts",
            required: false
        }
    ],
    url_key: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    sort_order: {
        type: Number,
        default: 1
    },
    meta_title: {
        type: String,
        trim: true
    },
    meta_tags: {
        type: String,
        trim: true
    },
    meta_description: {
        type: String,
        trim: true
    },
    status: {
        type: Number,
        default: 1,
        required: true
    },
    created_at: {
        type: Date,
        required: true,
        immutable: true,
        default: () => Date.now()
    },
    updated_at: {
        type: Date,
        required: true,
        default: () => Date.now()
    }
});

blogCategorySchema.pre("save", catchAsyncError(async function(next) {
    this.updated_at = Date.now();
    next();
}));

module.exports = mongoose.model("BlogCategory", blogCategorySchema);
