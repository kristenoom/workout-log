const router = require('express').Router();
const validateSession = require('../middleware/validate-session');
const sequelize = require('../db');
const Log = sequelize.import('../models/log');


/* ***********************
**** CREATE LOG ENTRY ****
*********************** */
router.post('/', validateSession, (req, res) => {
    const logEntry = {
        owner_id: req.user.id,
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result
    };
    
    Log.create(logEntry)
    .then((log) => res.status(200).json(log))
    .catch((err) => res.status(500).json({error:err}));
});

/* ***********************
**** RETURN LOG ENTRY ****
*********************** */
//http://localhost:3000/log/log
router.get('/log', validateSession, (req, res) => {
    const query = {
        where: {
            owner_id: req.user.id
        }
    };

    Log.findAll(query)
    .then((logs) => res.status(200).json(logs))
    .catch((err) => res.status(500).json({error: err}));
});

/* ***********************
**** RETURN LOG ENTRY ****
*** BY INDIVIDUAL USER ***
*********************** */
//http://localhost:3000/log/log/3
router.get('/log/:id', validateSession, (req, res) => {
    const query = {
        where: {
            id: req.params.id, 
            owner_id: req.user.id
        }
    };

    Log.findOne(query)
    .then((logs) => res.status(200).json(logs))
    .catch((err) => res.status(500).json({error: err}));
});

/* ***********************
**** DELETE LOG ENTRY ****
*********************** */
router.delete('/log/:id', validateSession, (req,res)=>{
    const query = {where: {owner_id: req.params.id}};

    Log.destroy(query)
    .then(()=> res.status(200).json({message: 'Log removed from database.'}))
    .catch((err) => res.status(500).json({error:err}));
});

/* ***********************
**** UPDATE LOG ENTRY ****
*********************** */
router.put('/log/:id', (req,res) => {
    const updateLogEntry = {
        owner_id: req.params.id,
        description: req.body.description,
        definition: req.body.definition,
        result: req.body.result
    };

    const query = { where: {owner_id: req.params.id}};

    Log.update(updateLogEntry, query)
    .then((log) => res.status(200).json({message: 'Log entry updated!'}))
    .catch((err) => res.status(500).json({error:err}));
});

module.exports = router;