const User = require('../models/user')
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
         return res.status(401).json({message: 'Authentication Invalid'})
    }
    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)

        req.user = {userId: payload.userId, name:payload.name}
        if (payload.role !== 'admin') {
            return res.status(401).json({message: "Not authorized"})
        } else {
            next()
        }
    } catch (error) {
        return res.status(401).json({error: 'Authentication Invalid'})
    }
}

module.exports = auth