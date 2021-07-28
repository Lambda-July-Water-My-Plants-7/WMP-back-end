const express = require('express');

const users = require("./user-model");
const router = express.Router()

router.get('/', (req, res, next) => {
    users.findUsers()
    .then(resp => {
        res.status(200).json(resp);
    }).catch(next);
})

module.exports = router;