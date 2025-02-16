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
    upi_id: {
        type: String,
        required: true,
        default: null
    },
    mpin: {
        type: String, required: true
    }
}, { timestamps: true });

const accountModel = mongoose.model("ACCOUNT", accountSchema);

module.exports = accountModel;