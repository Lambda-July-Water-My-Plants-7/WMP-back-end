const express = require('express');
const bcrypt = require('bcryptjs');

const users = require("../../models/userHelpers");
const router = express.Router()

const { generateToken } = require('./auth-token');
const { verifyToken } = require('./auth-middleware');

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json({ message: "username and password both required" })
    } else {
        users.findUserByUsername(username)
            .then((user) => {
                if (!user) {
                    res.status(400).json({ message: "No such username exists." });
                } else { 
                    if (bcrypt.compareSync(password, user.password)) {
                        const token = generateToken(user);

                        res.status(200).json({ message: `Welcome, ${user.username}`, token })
                    } else {
                        res.status(500).json({ message: "Username and password do not match." })
                    }
                }
            }).catch((err) => res.status(500).json({ message: "Error during login process" }) )
    }

})

router.post('/register', (req, res) => {
    const neoUser = req.body;

    const hash = bcrypt.hashSync(neoUser.password, 12);
    neoUser.password = hash;

    if (!neoUser.username || !neoUser.password) {
        res.status(400).json({ message: "username and password both required" })
    } else {
        users.registerUser(neoUser)
            .then((resp) => {
                res.status(201).json(resp);
            }).catch((err) => {
                if (err.errno === 19) {
                    res.status(400).json({ message: "Constraints violated " })
                } else {
                    res.status(500).json({ message: "Unknown server error ",
                    error: err
                    })
                }
            })
    } 
})

router.post("/testToken", verifyToken, (req, res, next) => {
    res.status(200).json({ message: "Proper token detected." });
})

module.exports = router;