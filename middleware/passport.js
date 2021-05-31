const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const keys = require('../config/keys')
const mongoose = require('mongoose')
const User = mongoose.model('users')
require('dotenv').config();

const key = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwt || process.env.SECRET
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(key, async (payload, done) => {

            try {
                const user = await User.findById(payload.userId).select('email id')

                if (user) {
                    done(null, user)
                } else {
                    done(null, false)
                }
            } catch(e) {
                console.log(e)
            }
        })
    )
}