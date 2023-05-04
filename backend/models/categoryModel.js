const mongoose = require("mongoose");
const slugify = require("../utils/slugify");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the category name."],
        trim: true
    },
    slug: {
        type: String,
        index: true
    },
    description: {
        type: String,
        required: [true, "Please neter category Description."]
    },
    parent: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        default: null
    },
    ancestors: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            index: true
        },
        name: String,
        slug: String
    }],
    products: [
        {
            type: mongoose.Schema.ObjectId,
            ref:"Product",
            required: false
        }
    ],
    status: Boolean,
    images: [
        {
            type: String,
            required: [true, "Please select the images"],
            trim: true
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

categorySchema.pre("save", async function(next) {
    this.slug = slugify(this.name);
    next();
});

module.exports = mongoose.model("Category", categorySchema);
