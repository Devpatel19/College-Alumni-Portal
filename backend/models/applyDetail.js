const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const applyDetailSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        trim: true
    },
    Email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    MobileNo: {
        type: String,
        required: true,
        trim: true,
    },
    Job: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Job'
    }
}, {
    timestamps: true
})





const ApplyDetail = mongoose.model('ApplyDetail', applyDetailSchema)

module.exports = ApplyDetail

