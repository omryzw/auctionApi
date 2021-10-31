const mongoose = require("mongoose");
const autoBidSchema = new mongoose.Schema({
    user: {
        type: String,
        required: [true, "User is a required field"],
    },
    maxAmount: {
        type: Number,
        required: [true, "maxAmount is a required field"],

    },
    controlAmount: {
        // same as maxAmount
        type: Number,
        required: [true, "controlAmount is a required field"],
    },
    alertTrigger: {
        type: Number,
        required: [true, "alertTrigger is a required field"],
    },
}, {timestamps:true});

module.exports = mongoose.model("Autobid", autoBidSchema);