const express = require('express');
const router = express.Router();
const connection = require('../secret');

//Get all profiles
router.get('/', (req, res) => {
    connection.query('SELECT * FROM profile', (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération des users')
        } else {
            res.status(200).json(results);
        }
    });
});

module.exports = router;