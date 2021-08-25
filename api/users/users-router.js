const express = require('express');

const users = require("./user-model");
const { secureByOwnerID } = require('./users-middleware');
const router = express.Router()

router.get('/', (req, res, next) => {
    users.findUsers()
    .then(resp => {
        res.status(200).json(resp);
    }).catch(next);
})

router.put('/:userID', 
    [secureByOwnerID],
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