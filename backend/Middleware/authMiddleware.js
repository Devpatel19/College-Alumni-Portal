const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const admin = (req,res, next) =>{
    if(req.user && req.user.isAdmin){
        next()
    }else{
        res.status(401).send({error: 'Not authorized as an admin'})
    }
}


const alumni = (req,res, next) =>{
    if(req.user && req.user.type == "Alumni"){
        next()
    }else{
        res.status(401).send({error: 'Not authorized as an Alumni'})
    }
}

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'thisismyDemocourse')
        const user = await User.findOne({ _id: decoded._id })

        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}


module.exports = { auth, admin, alumni }