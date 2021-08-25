const bcrypt = require('bcryptjs');
const { phone } = require('phone');
const { findUserByID } = require('./user-model');

const secureByOwnerID = async (req, res, next) => {
    const { userID } = req.params;
    const certID = req.decoded.id;

    const target = await findUserByID(userID);

    if (target.userID === certID) {
        next();
    } else {
        res.status(403).json({ message: "That is not your user" });
    }
}

const encryptPassword = (req, res, next) => {
    const { password } = req.body

    if (password) {
        const hash = bcrypt.hashSync(password, 12);
        req.body.password = hash;
    }

    next();
}

const validPhone = (req, res, next) => {
    const { phoneNumber } = req.body;
    const response = phone(phoneNumber);

    if (response.isValid) {
        next();
    } else {
        res.status(400).json({
            message: "Improper phone number format",
            phoneNumber: phoneNumber
        })
    }
}

const verifyUserPayload = (req, res, next) => {
    const neoUser = req.body;

    if (!neoUser.username || typeof(neoUser.username) !== "string"
        || !neoUser.password || typeof(neoUser.password) !== "string"
        || !neoUser.phoneNumber 
        || typeof(neoUser.phoneNumber) !== "string" ) {
        res.status(400).json({ 
            message: "username, password, and phoneNumber all required" 
        });
    } else {
        next();
    }
}

module.exports = {
    encryptPassword,
    secureByOwnerID,
    verifyUserPayload,
    validPhone
}
