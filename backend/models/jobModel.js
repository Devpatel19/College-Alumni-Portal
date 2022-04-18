const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const jobSchema = new mongoose.Schema({
    CompanyName: {
        type: String,
        required: true,
        trim: true
    },
    Role: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    Experience: {
        type: String,
        required: true,
        trim: true,
    },
    City: {
        type: String,
        required: true,
        trim: true,
    },
    RequireSkill: {
        type: String,
        required: true,
        trim: true,

    },
    Salary: {
        type: String,
        required: true,
        trim: true,
    },
    ExtraDetail: {
        type: String,
    },
    applystudent: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'ApplyDetail'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})






const Job = mongoose.model('Job', jobSchema)

module.exports = Job

