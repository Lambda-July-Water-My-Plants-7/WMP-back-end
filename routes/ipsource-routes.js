const express = require('express');

const ipsource = require("../models/dbhelpers");
const router = express.Router()

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    ipsource.removeIPSource(id)
        .then((result) => {
            if (result > 0) {
                res.status(201).json(result);
            } else {
                res.status(404).json({message: "no such record found."});
            }
        }).catch(() => {
            res.status(500).json({
                message: "Undefined error on server."
            })
        })
})

router.get("/:id", (req, res) => {
    const {id} = req.params;
    ipsource.findIPSourceByID(id)
        .then((response) => {
            if (response) {
                res.status(201).json(response);
            } else {
                res.status(404).json({message: "no such record found"});
            }
        }).catch(() => {
            res.status(500).json({
                message: "Undefined error on server."
            })
        })
})

router.get("/", (req, res) => {
    ipsource.getAllIPSource()
        .then(data => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json({
                message: "Undefined error on server.",
                error: err
            })
        })
})

router.post("/", (req, res) => {
    if (!req.body.sourcename) {
        res.status(300).json({message: "All IP sources MUST have a name"});
    }
    ipsource.addIPSource(req.body)
        .then((source) => {
            res.status(201).json(source);
        }).catch((err) => {
            res.status(500).json({
                message: "Undefined error on server.",
                error: err
            })
        })
})

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    
    ipsource.modifyIPSource(id, changes)
        .then((result) => {
            if (result) {
                res.status(201).json(result);
            } else {
                res.status(404).json({message: "no such record found"});
            }
        }).catch(() => {
            res.status(500).json({
                message: "Undefined error on server."
            })
        })
})

module.exports = router;