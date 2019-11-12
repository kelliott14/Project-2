
var jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "Authentication error"
        })
    }

    jwt.verify(token, 'secret', function (err, decoder) {
        if (err) {
            throw err;
        }
        req.user = decoder.user;
        next();
    })
}