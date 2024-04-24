const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        iduser:{
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phonenumber: {
            type: String,
            required: true,
        },
        detail_cart:{
            type: Array,
            required: true,
        },
        statusOrder:{
            type: String,
            required: true,
        },
        totalOrder: {
            type: Number,
            required: true
        },
        timecreateOrder: {
            type: String,
            required: true
        },
        timeReturn: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Order", OrderSchema);
