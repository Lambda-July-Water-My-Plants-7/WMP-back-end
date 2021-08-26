const express = require('express');

const users = require("./user-model");
const { secureByOwnerID, encryptPassword } = require('./users-middleware');
const { verifyUserDoesNotExist } = require('../auth/auth-middleware')
const router = express.Router()

router.get('/', (req, res, next) => {
    const {id} = req.decoded;
    
    users.findUserByID(id)
    .then(resp => {
        res.status(200).json(resp);
    }).catch(next);
})

router.get('/:username', (req, res, next) => {
    const {username} = req.params;
    
    users.findUserByUsername(username)
    .then(resp => {
        res.status(200).json(resp);
    }).catch(next);
})

router.put('/', [secureByOwnerID, verifyUserDoesNotExist, encryptPassword],
    (req, res, next) => {
        const {id} = req.decoded;
        let neoUser = req.body;
        neoUser.userID = id;

        users.updateUser(neoUser)
            .then((resp) => {
                res.status(201).json(resp);
            }).catch(next);
})

router.put('/:userID', 
    [secureByOwnerID, verifyUserDoesNotExist, encryptPassword],
    (req, res, next) => {
        const { userID } = req.params;
        let neoUser = req.body;
        neoUser.userID = userID;
        
        users.updateUser(neoUser)
            .then((resp) => {
                res.status(201).json(resp);
            }).catch(next);
})

module.exports = router;