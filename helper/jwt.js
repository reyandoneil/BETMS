const { verify, sign } = require('jsonwebtoken')
const RAHASIA = process.env.RAHASIA

const signToken = (payload) => {
    const token = sign(payload, RAHASIA)
    return token
}

const verifyToken = (token) => {
    const ver = verify(token, RAHASIA)
    return ver
}

module.exports = {
    signToken,
    verifyToken
}