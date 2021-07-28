const express = require('express');
const multer = require('multer');
const { checkPlantID, secureByOwnerID } = require('./plants-middleware');

const plants = require('./plants-model');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({
    storage: storage
});

router.get("/", (req, res, next) => {
    const ownerID = req.decoded.id;
    plants.findPlantsByOwner(ownerID)
        .then(resp => {
            res.status(200).json(resp);
        }).catch(next);
})

router.get("/:plantID", [checkPlantID, secureByOwnerID], 
    (req, res, next) => {
        const { plantID } = req.params;
        plants.findPlantById(plantID)
            .then((resp) => {
                res.status(200).json(resp);
            }).catch(next);
    })

router.post("/", [upload.single('image')], (req, res, next) => {
    const ownerID = req.decoded.id;
    let neoPlant = req.body;
    neoPlant.ownerID = ownerID;

    delete neoPlant.userID;

    plants.createPlant(neoPlant)
        .then(() => {
            res.status(201).json({...neoPlant});
        }).catch(next);
})

router.put("/:plantID", [checkPlantID, secureByOwnerID], (req, res, next) => {
    const { plantID } = req.params;
    let neoPlant = req.body;
    neoPlant.plantID = plantID;
    neoPlant.ownerID = req.decoded.id;

    plants.updatePlant(neoPlant)
        .then((resp) => {
            res.status(201).json(resp);
        }).catch(next);
})

router.delete("/:plantID", [checkPlantID, secureByOwnerID], (req, res, next) => {
const { plantID } = req.params;

    plants.removePlant(plantID)
        .then(() => {
            res.status(200).json({
                message: `Plant ID ${plantID} has been deleted.` 
            });
        }).catch(next);
})

module.exports = router;
