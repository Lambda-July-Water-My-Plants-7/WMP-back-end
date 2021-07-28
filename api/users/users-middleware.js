const { phone } = require('phone');

const validPhone = (req, res, next) => {
    let { phoneNumber } = req.body;
    phoneNumber = "+" + phoneNumber;
    const response = phone(phoneNumber);

    if (response.isValid) {
        next();
    } else {
        res.status(400).json({
            message: "Improper phone number format",
            phoneNumber: phoneNumber,
            response: response
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
    verifyUserPayload,
    validPhone
}
