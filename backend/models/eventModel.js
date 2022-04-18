const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const eventSchema = new mongoose.Schema({
    Name:{
        type: String,
        required: true,
    },
    Date:{
        type: Date,
    },
    ImageLocation: {
        type: String,
        required: true,
        
    },
    Description: {
        type: String,
        required: true,
        trim: true,
    },
}, {
    timestamps: true
})


const Event = mongoose.model('Event', eventSchema)

module.exports = Event

