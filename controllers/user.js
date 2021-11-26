const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const {secret} = require('../configs')
const userRegister = async (userDets, role, res, next) => {
    try {
        const user = new User({
            ...userDets,
            role: role
        })
        console.log(role)
        await user.save()
        res.status(200).json({message: 'create user successfully'})
    } catch (error) {
        next(error)
    }
}
const userLogin = async (userCreds, role, res, next) => {
    let { userName, password } = userCreds
    const user = await User.findOne({userName})
    if(!user){
        return res.status(404).json({  
            message: 'userName is not exist'
        })
    }
    if(user.role !== role) {
        return res.status(403).json({
            message: 'role is incorrect'
        })
    }
    let isMatch = await bcryptjs.compare(password, user.password)
    if(isMatch){
        let token = jwt.sign({
            sub: user._id,
            role: user.role
        }, secret, {
            expiresIn: '7 days'
        })
        const result = {
            userName: user.userName,
            password: user.password,
            role: user.role,
            token: `Bearer ${token}`
        }
        return res.status(200).json({
            ...result,
            message: 'sign in successfully'
        })
    }
    else {
        return res.status (403).json({
            message: 'incorrect password'
        })
    }
}
const userAuth = passport.authenticate('jwt',{session: false})
const userProfile = user => {
    return {
        userName: user.userName,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    }
}
module.exports = {
    userAuth,
    userRegister,
    userLogin,
    userProfile
}