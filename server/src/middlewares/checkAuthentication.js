const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.checkAutentication = function checkAutentication(req, res, next) {
    const {authKey} = req.cookies

    if (!authKey) {
        res.status(401).send('Missing authentication token')
        return;
    }
    try {
        const authKeyDecoded = jwt.verify(authKey, process.env.AUTH_SECRET)
        const { userID } = authKeyDecoded
        req.userID = userID
        res.status(200)
        next()
    }
    catch(error) {
        res.status(401).send('Not authorised, wrong token' + error);
    }
}