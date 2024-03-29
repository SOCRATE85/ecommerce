const mongoose = require("mongoose");
const catchAsyncError = require("../middleware/catchAsyncError");

const blogPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    categories: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "BlogCategory",
            required: [true, "Please select Blog Category."]
        }
    ],
    full_content: {
        type: String,
        required: [true, "Please enter the contents"],
        trim: true
    },
    short_content: {
        type: String,
        required: [true, "Please enter the fill content"],
        trim: true
    },
    blogimages: [
        {
            type: String,
            required: [true, "Please select the images"],
            trim: true
        }
    ],
    url_key: {
        type: String,
        required: true,
        trim: true
    },
    url_path: {
        type: String,
        required: true,
        trim: true
    },
    meta_title: {
        type: String,
        required: false,
        trim: true
    },
    meta_tags: {
        type: String,
        required: false,
        trim: true
    },
    meta_description: {
        type: String,
        required: false,
        trim: true
    },
    comments: [
        {
            value: {
                type: String,
                required: true,
                trim: true
            },
            sortOrder: {
                type: Number,
                required: false
            }
        }
    ],
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    created_at: {
        type: Date,
        default: () => Date.now()
    },
    updated_at: {
        type: Date,
        default: () => Date.now()
    }
});
blogPostSchema.index({ title: 1, url_key: 1}, {unique: true});
blogPostSchema.pre("save", catchAsyncError(async function(next) {
    this.updated_at = Date.now();
    next();
}));
module.exports = mongoose.model("BlogPosts", blogPostSchema);
