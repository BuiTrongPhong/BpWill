const User = require('../models/User')
const validUserEmail = async (req, res, next) => {
    try {
        const user = await User.findOne({
            userName: req.body.userName
        })
        if(user){
            return res.status(400).json({message: 'userName is already in use'})
        }
        const email = await User.findOne({
            email: req.body.email
        })
        if(email){
            return res.status(400).json({message: 'email is already in use'})
        }
        next()
    } catch (error) {
        next(error) 
    }
}

const validSignUp = {
    validUserEmail,
}
module.exports = validSignUp
