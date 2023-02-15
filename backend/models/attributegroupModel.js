const mongoose = require("mongoose");

const attributegroupSchema = new mongoose.Schema({
    attribute_group_name: {
        type: String,
        required: [true, "Please enter the attribute Group Name"],
        trim: true
    },
    attributes: [
        {
           attributeId: {
                type: mongoose.Schema.ObjectId,
                ref:"Attributes",
                required: false
           },
           attributeName: {
                type: String,
                trim: true
           }       
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("AttributeGroup", attributegroupSchema);