const express = require('express')
const {auth, admin} = require('../Middleware/authMiddleware')
const { EventPost, ReadallEvent, eventdelete, Editevent} = require('../controllers/eventController')
const router = express.Router()

router.post('/event',auth,EventPost)

router.get('/event', ReadallEvent)

router.delete('/event/:id',eventdelete )

router.patch('/event/:id', Editevent )

module.exports = router