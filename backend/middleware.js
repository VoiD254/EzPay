const {JWT_SECRET} = require("./config");
const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next){
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({
            msg: "access forbidden"
        });
    }

    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token, JWT_SECRET);

        req.userId = decoded.userId;
        next();
    } catch{
        return res.status(403).json({
            msg: "access forbidden"
        });
    }

    // create authHeader
    // check its validity
    // create token
    // verify token
};

module.exports = {
    authMiddleware
};
