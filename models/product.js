const mongoose = require("mongoose");
const ProdctSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Name is a required field"],
    },
    category:{
        type: String,
        required: [true, "Category is a required field"],
        default: "Others"
    },
    active: {
        type: Boolean,
        default: true,
        // every product added is already active for this demo , there is nos start date
    },
    endTime: {
        hours : {
            type: Number,
            required: [true, "Hours is a required field"],
        },
        minutes : {
            type: Number,
            required: [true, "Minutes is a required field"],
        },
        
    },
    endDate: {
        type: Date,
        required: [true, "End Date is a required field"],

    },
    currentBid: {
        user: {
            type: String,
            default: "initial"
        },
        amount: {
            type: Number,
            default: 0
        },
    },
    photoUrl: {
        type: String,
        required: [true, "Photo is a required field"],

    },
    bids : [{
        user: {
            type: String,
        }
        ,
        amount: {
            type: Number,
        }
    },
],
autoBidders: [{
    user: {
        type: String,
    }
    ,
    maxAmount: {
        type: Number,
    }
}],
}, {
    timestamps: true
});

module.exports = mongoose.model("Product", ProdctSchema);