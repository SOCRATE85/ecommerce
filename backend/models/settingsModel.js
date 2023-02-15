const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
    path: {
        type: String,
        required: true
    },
    value: {
        type: String,
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

settingsSchema.pre("save", async function(next){
    this.updated_at = Date.now();
    next();
});

module.exports = mongoose.model("Settings", settingsSchema);
