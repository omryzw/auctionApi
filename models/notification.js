const mongoose = require("mongoose");
const notifySchema = new mongoose.Schema({
    user: {
        type: String,
        required: [true, "User is a required field"],
    },
    message: {
        type: String,
        required: [true, "Message is a required field"],
    },
    read: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Nofification", notifySchema);