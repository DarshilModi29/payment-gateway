const mongoose = require("mongoose");
const accountSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    payment_method: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const transactionModel = mongoose.model("TRANSACTION", accountSchema);

module.exports = transactionModel;