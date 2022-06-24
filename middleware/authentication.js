const { User } = require('../models')
const {verifyToken} = require('../helper/jwt')


const authentication = (req, res, next) => {
    const { access_token } = req.headers
    if (access_token) {
        decode = verifyToken(access_token)
        req.userData = decode
        // console.log(req.userData,'ini decode');
        User.findByPk(req.userData.id)
            .then(data => {
                if (!data) {
                    return res.status(404).json({ message: 'User Not found' })
                } else {
                    next()
                }
            })
            .catch(err => {
                return res.status(500).json({ message: err.message })
            })
    } else {
        return res.status(401).json({ message: 'Login needed' })
    }
}

module.exports = authentication 