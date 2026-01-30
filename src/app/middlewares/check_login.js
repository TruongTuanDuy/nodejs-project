const jwt = require('jsonwebtoken');

function checkLogin(req, res, next) {
    // check header authorization

    //CÁCH 1: NHẬN TOKEN TỪ HEADER
    // if (!req.headers.authorization) {
    //     res.status(401).send({
    //         message: "Unauthorized",
    //     });
    //     return;
    // }
    // // verify a token symmetric - synchronous
    // let token = req.headers.authorization.split(' ')[1];

    //CÁCH 2: NHẬN TOKEN TỪ COOKIES
    let token = req.cookies.token;

    try {
        var decoded = jwt.verify(token, 'duy');
        console.log(decoded);
        req.userId = decoded.userId;
        next();

    } catch (error) {
        res.status(401).send({
            message: "Unauthorized",
            error: error.message,
        });
        return;
    }
    // next();
};
module.exports = { checkLogin };