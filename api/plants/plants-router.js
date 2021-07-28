const express = require('express');
const multer = require('multer');
const { checkPlantID, secureByOwnerID } = require('./plants-middleware');

const plants = require('./plants-model');
const router = express.Router();

const fileFilter = (req, file, cb) => {
    switch(file.mimetype) {
        case ('image/jpeg'):
        case ('image/gif'):
        case ('image/png'): {
            cb(null, true);
        }
        default: 
            cb(null, false);
        
    }
}
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
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
    neoPlant.image = req.file.path;

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
