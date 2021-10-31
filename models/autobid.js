const mongoose = require("mongoose");
const autoBidSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    maxAmount: {
        type: Number,
        required: [true, "maxAmount is a required field"],

    },
    alertTrigger: {
        type: Number,
        required: [true, "alertTrigger is a required field"],
    },
}, {timestamps:true});

module.exports = mongoose.model("Autobid", autoBidSchema);