const express = require('express');

const plants = require('./plants-model');
const router = express.Router();

router.get("/", (req, res, next) => {
    res.status(200).json("Get the plants.");
})

module.exports = router;
