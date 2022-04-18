const mongoose = require('mongoose');

const otpSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String
    },
    expireAt: {
        type: Date,
        default: Date.now,
        index: { expires: '1m' },
    },
}, { timestamps: true });

const OtP = mongoose.model('Otp', otpSchema);
module.exports = OtP;