const mongoose = require("mongoose");

const userScheme = new mongoose.Schema({
    id:{
        type: Number,
        unique: true
    },
    firstName: {
        type: String,
    },
    userName:{
        type: String,
    },
    inviteLink:{
        type: String,
    },
    userType:{
        type: String,

    },
    date:{
        type: Date
    }
})
module.exports = mongoose.model("user",userScheme)