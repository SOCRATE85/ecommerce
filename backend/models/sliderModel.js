const mongoose = require("mongoose");

const sliderSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    position: {
        type: Number,
        required: false
    },
    show_title: {
        type: Boolean,
        required: true,
        default: false
    },
    status: {
        type: Boolean,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    style_content: {
        type: String,
        required: false
    },
    width: {
        type: Number,
        required: false
    },
    height: {
        type: Number,
        required: false
    },
    show_caption: {
        type: Boolean,
        required: true,
        default: false
    },
    slider_speed: {
        type: Number,
        required: false
    },
    min_item: {
        type: String,
        required: false,
        default: 1
    },
    max_item: {
        type: String,
        required: false,
        default: 10
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

sliderSchema.pre("save", async function(next){
    this.updated_at = Date.now();
    next();
});

module.exports = mongoose.model("Slider", sliderSchema);
