const express = require('express')
const {auth, admin} = require('../Middleware/authMiddleware')
const { ProfileDetail, readprofileDetail, UpdateProfile, allProfile } = require("../controllers/profileController")
const router = express.Router()

router.post('/profile',auth, ProfileDetail)

router.get('/profile/:id',auth, readprofileDetail)

router.get('/profiles',allProfile)

router.patch('/profile/:id', auth, UpdateProfile)

module.exports = router