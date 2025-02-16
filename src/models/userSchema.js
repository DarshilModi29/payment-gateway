const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    pan_number: {
        type: String,
        required: true,
        unique: true
    },
    aadhar_number: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phn_number: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });

const userModel = mongoose.model("USER", userSchema);

module.exports = userModel;