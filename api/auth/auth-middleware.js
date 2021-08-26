const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = require('../../config/secrets');
const users = require('../users/user-model');

function getUserID(req, res, next) {
    let neoID =0 
    if (req) {
        if (req.headers && req.headers.authorization) {
            const token = req.headers.authorization;
            const secret = TOKEN_SECRET;
        
            if (token) {
                jwt.verify(token, secret, (err, decoded) => {
                    if (err) {
                        res.status(401).json({ message: "auth token corrupted or expired"})
                    } else {
                        neoID = decoded.id;
                    }
                })
            } 
        } 
    }
    return neoID;
}

function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    const secret = TOKEN_SECRET;

    if (token) {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                res.status(401).json({ message: "auth token corrupted or expired"})
            } else {
                req.decoded = decoded;
                next();
            }
        })
    } else { 
        res.status(401).json({ message: "improper or expired auth token"})
    }
}

function verifyUserDoesNotExist(req, res, next) {
    const { username } = req.body;

    users.findUserByUsername(username)
        .then(resp => {
            if (resp && resp.username == username) {
                res.status(403).json({
                    message: "A user with that username already exists"
                })
            }
        }).catch(next);
    next()
}

module.exports = {
    getUserID,
    verifyToken,
    verifyUserDoesNotExist
}