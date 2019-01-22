const express = require('express');
const router = express.Router();
const connection = require('../secret');

//Get all bons plans
router.get('/', (req, res) => {
    connection.query('SELECT * FROM bonsplans WHERE is_visible = ?', 1, (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération des bons plans')
        } else {
            res.status(200).json(results);
        }
    });
});

//Get bon plan by ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    connection.query('SELECT * FROM bonsplans WHERE id = ?', id, (err, results) => {
        if (err) {
            res.status(500).send("Erreur lors de la récupération du bon plan");
        } else {
            res.status(200).json(results);
        }
    });
});

// Create bon plan
router.post('/', (req, res) => {
    const { title, link, description, is_visible, user_id } = req.body
    connection.query('INSERT INTO bonsplans VALUES (null, ?, ?, ?, 1, ?)', [title, link, description, user_id], (err, results) => {
        if (err) {
            console.log(err)
            res.status(500).send("Erreur lors de la création du bon plan")
        } else {
            res.status(201).json(results)
        }
    });
});

//Delete bon plan
router.delete('/:id', (req, res) => {
    const id = req.params.id
    connection.query('UPDATE bonsplans SET is_visible = 0 WHERE id = ?', id, (err) => {
        if (err) {
            res.status(500).send("Erreur lors de la suppression du bon plan")
        } else {
            res.sendStatus(200)
        }
    });
});

//Update bon plan
router.patch('/:id', (req, res) => {
    const id = req.params.id
    const { title, link, description } = req.body
    connection.query('UPDATE bonsplans SET title = ?, link = ?, description = ? WHERE id = ?', [title, link, description, id], (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la modification du bon plan')
        } else {
            res.status(200).json(results)
        }
    });
});

//get all bons plans from one user with his username
router.get('/mesbonsplans/:name', (req, res) => {
    const name = req.params.name 
    connection.query('SELECT * FROM bonsplans, user WHERE bonsplans.user_id = user.id AND user.username = ?', name, (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération des bons plans de cet utilisateur')
        } else {
            res.status(200).json(results)
        }
    });
});



module.exports = router;