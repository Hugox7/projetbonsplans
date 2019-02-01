const express = require('express');
const router = express.Router();
const connection = require('../secret');

// Get comments linked to a bon plan   
router.get('/bybonplan', (req, res) => {
    connection.query('SELECT * FROM comments, bonsplans WHERE comments.bonsplans_idbonsplans = bonsplans.idbonsplans AND bonsplans.is_visible = ?', 1, (err, results) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.status(200).json(results)
        }
    });
});

// Get comments linked to a user
router.get('/byuser', (req, res) => {
    connection.query('SELECT * FROM comments, users WHERE comments.user_iduser = user.iduser AND user.is_active = ?', 1, (err, results) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.status(200).json(results)
        }
    });
});

// Post a comment
router.post(`/post/:user`, (req, res) => {
    const user = req.params.user
    const { content, idbonplan } = req.body
    connection.query('INSERT INTO comments (content, user_iduser, bonsplans_idbonsplans) VALUES (?, ?, ?)', [content, user, idbonplan], (err, results) => {
        if (err) {
            res.sendStatus(500)
        } else {
            console.log('user' + req.user)
            res.status(200).json(results)
        }
    });
});
    


module.exports = router;
