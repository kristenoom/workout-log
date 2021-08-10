const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const Log = sequelize.import('../models/log');

/* ***********************
**** CREATE LOG ENTRY ****
*********************** */
router.post('/log', (req,res) => {
    const logEntry = {
        username: req.body.username,
        description: req.body.description,
        definition: req.body.definition,
        result: req.body.result
    };
    
    Log.create(logEntry)
    .then((log) => res.status(200).json(log))
    .catch((err) => res.status(500).json({error:err}));
});

/* ***********************
**** RETURN LOG ENTRY ****
*********************** */
router.get('/log', (req, res) => {
    const query = {where: {username: req.params.username}};

    Log.findAll()
    .then((logs) => res.status(200).json(logs))
    .catch((err) => res.status(500).json({error: err}));
});

/* ***********************
**** RETURN LOG ENTRY ****
*** BY INDIVIDUAL USER ***
*********************** */
router.get('/log/:id', (req, res) => {
    const query = {where: {username: req.params.username}}
    Log.findAll()
    .then((logs) => res.status(200).json(logs))
    .catch((err) => res.status(500).json({error: err}));
});

/* ***********************
**** DELETE LOG ENTRY ****
*********************** */
router.delete('/log/:id', (req,res)=>{
    const query = {where: {id: req.params.userId, userId: req.user.id}};

    Log.destroy(query)
    .then(()=> res.status(200).json({message: 'Log removed from database.'}))
    .catch((err) => res.status(500).json({error:err}));
});

/* ***********************
**** UPDATE LOG ENTRY ****
*********************** */
router.put('/log/:id', (req,res) => {
    const updateLogEntry = {
        username: req.body.username,
        description: req.body.description,
        definition: req.body.definition,
        result: req.body.result
    };

    const query = { where: {id: req.params.userId}};

    Log.update(updateLogEntry, query)
    .then((log) => res.status(200).json({message: 'Log entry updated!'}))
    .catch((err) => res.status(500).json({error:err}));
});

module.exports = router;