const express = require('express');

const plants = require('./plants-model');
const router = express.Router();

router.get("/", (req, res, next) => {
    const ownerID = req.decoded.id;
    plants.findPlantsByOwner(ownerID)
        .then(resp => {
            res.status(200).json({
                id: id,
                resp
            });
        }).catch(next);
})

module.exports = router;
