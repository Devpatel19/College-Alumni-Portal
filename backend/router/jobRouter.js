const express = require('express')
const {auth, admin, alumni} = require('../Middleware/authMiddleware')
const  { JobPost, readallJob, readJob, deleteJob, EditJob } = require('../controllers/jobControllers')
const router = express.Router()

router.post('/job',auth, JobPost)

router.get('/jobs',auth, readallJob)

router.get('/jobs/:id',auth, readJob)

router.delete('/jobs/:id',auth, alumni, deleteJob)

router.patch('/jobs/:id',auth,alumni, EditJob)

module.exports = router