const mongoose = require("mongoose");

const groupScheme = new mongoose.Schema({
    groupName: {
        type: String,
        required: true,
        unique: true, 
    },
    course: {
        type: Number,
        default: null,
    },
    context: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model("group",groupScheme)