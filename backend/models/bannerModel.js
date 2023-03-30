const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slider_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Slider",
        required: [true, "Please select Slider."]
    },
    bannerOrder: {
        type: Number,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    images: [
        {
            type: String,
            required: [true, "Please select the images"],
            trim: true
        }
    ],
    clickurl: {
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
    status: {
        type: Boolean,
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

bannerSchema.pre("save", async function(next){
    this.updated_at = Date.now();
    next();
});

module.exports = mongoose.model("Banner", bannerSchema);
