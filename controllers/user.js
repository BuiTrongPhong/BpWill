const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const { secret } = require('../configs')
function createToken(user) {
    const token = jwt.sign({
        sub: user._id,
        role: user.role
    }, secret, {
        expiresIn: '7 days'
    })
    return token
}
const userRegister = async (userReg, role, res) => {
    const user = new User({
        ...userReg,
        role,
        tokens: []
    })
    // const token = createToken(user)
    // console.log(user.tokens)
    // user.tokens = user.tokens.concat(token)
    await user.save()
    res.status(200).json({
        message: 'create user successfully',
        data: { user}
    })
}
const userLogin = async (userCreds, role, res) => {
    let { userName, password } = userCreds
    const user = await User.findOne({ userName })
    if (!user) {
        return res.status(404).json({
            message: 'userName is not exist'
        })
    }
    if (user.role !== role) {
        return res.status(403).json({
            message: 'role is incorrect'
        })
    }
    let isMatch = await bcryptjs.compare(password, user.password)
    if (isMatch) {
        const token = createToken(user)
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
        return res.status(403).json({
            message: 'incorrect password'
        })
    }
}
const userLogout = () => {
    
}
const userAuth = passport.authenticate('jwt', { session: false })
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
    userProfile,
    userLogout
}