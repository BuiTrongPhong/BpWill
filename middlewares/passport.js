const User = require('../models/User')
const {secret} = require('../configs')
const {Strategy, ExtractJwt} = require('passport-jwt')

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
}
module.exports = (passport) => {
    passport.use(new Strategy(opts, async(payload, done) => {
        try {
            const user = await User.findById(payload.sub)
            if(!user){
                return done(null, false)
            }
            return done(null, user)
        } catch (error) {
            return done(error, false)
        }

    }))
}