const mongoose = require("mongoose");

const attributeSchema = new mongoose.Schema({
    frontend_label: {
        type: String,
        required: [true, "Please enter the attribute Label"],
        trim: true
    },
    attribute_code: {
        type: String,
        required: [true, "Please enter the attribute code"],
        trim: true
    },
    frontend_input: {
        type: String,
        required: [true, "Please select the attribute type"]
    },
    backend_type: {
        type: String,
        required: false,
    },
    is_required: {
        type: Number,
        required: true,
    },
    is_user_defined: {
        type: Boolean,
        required: true,
        default: true
    },
    use_in_filter: {
        type: Boolean,
        default: false,
    },
    use_in_sorting: {
        type: Boolean,
        default: false,
    },
    attribute_options: [
        {
            value: {
                type: String,
                required: true
            },
            sortOrder: {
                type: Number,
                required: false
            }
        }
    ],
    default_value: {
        type: Number | String | Boolean,
        required:false,
    },
    created_at: {
        type: Date,
        default: () => Date.now()
    },
    updated_at: {
        type: Date,
        default: () => Date.now(),
    }
});
attributeSchema.pre('save', async function(next) {
    this.updated_at = Date.now();
    next();
});
module.exports = mongoose.model("Attributes", attributeSchema);
