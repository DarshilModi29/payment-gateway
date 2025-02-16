const mongoose = require("mongoose");
const transactionSchema = new mongoose.Schema({
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    payment_method: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

const transactionModel = mongoose.model("TRANSACTION", transactionSchema);

module.exports = transactionModel;