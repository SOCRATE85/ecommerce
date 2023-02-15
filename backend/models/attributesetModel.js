const mongoose = require("mongoose");

const attributesetSchema = new mongoose.Schema({
    attribute_set_name: {
        type: String,
        required: [true, "Please enter the attribute Set Title"],
        trim: true
    },
    
    attribute_group: [
        {
           attributeGroupId: {
                type: mongoose.Schema.ObjectId,
                ref:"AttributeGroup",
                required: false
           },
           attributeGroup: {
                type: String
           }         
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("AttributeSet", attributesetSchema);
