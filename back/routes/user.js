const express = require('express');
const router = express.Router();
const connection = require('../secret');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
  const upload = multer({
    dest : '../tmp/',
    limits : {
      fileSize: 3 * 1024 * 1024
    },
    storage,
    fileFilter: (req, file, cb) => {
      if(file.mimetype !== 'image/jpg' || file.mimetype !== 'image/jpeg' || file.mimetype !== 'image/png' ) {
        cb(new Error('Mauvais format de fichier'))
      }
      else {
        cb(null, true)
      } 
    }
  });


//Get all users
router.get('/', (req, res) => {
    connection.query('SELECT * FROM user WHERE is_active = ?', 1, (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération des users')
        } else {
            res.status(200).json(results);
        }
    });
});


//Get user by ID
router.get('/id/:id', (req, res) => {
    const userId = req.params.id;
    connection.query('SELECT * FROM user WHERE id = ?', userId, (err, results) => {
        if (err) {
            res.status(500).send("Erreur lors de la récupération de l'utilisateur");
        } else {
            res.status(200).json(results);
        }
    });
});

//get user by name
router.get('/username/:name', (req, res) => {
    const name = req.params.name;
    connection.query('SELECT * FROM user WHERE username = ?', name, (err, results) => {
        if (err) {
            res.status(500).send("Erreur lors de la récupération de l'utilisateur")
        } else {
            res.status(200).json(results)
        }
    });
});



//  create user
router.post('/register', upload.single('avatar'), (req, res) => {
    console.log(req.file, req.files)
    let { username, password, email, avatar, bio, first_name, last_name } = req.body
    // if (!username || !password || !email) {
    //     res.json({message : 'Merci de bien remplir tous les champs'})}
    connection.query('SELECT * FROM user WHERE username = ? OR email = ?', [username, email], (err, results) => {
        if (!results.length) {
            bcrypt.hash(password, 10, (err, hash) => {
                connection.query('INSERT INTO user (username, password, email, role, creation_date, last_update_date, is_active, avatar, bio, first_name, last_name) VALUES (?, ?, ?, ?, now(), now(), ?, ?, ?, ?, ?)', [username, hash, email, 'user', 1, avatar, bio, first_name, last_name], (err, results) => {
                    if (err) {
                        console.log(err)
                        res.status(500).send("Erreur lors de la création de l'utilisateur")
                    } else {
                        res.status(201).json(results)
                    }   
                });
            });
        } else {
            res.status(500).send('Mail ou username déjà existant')
        }
    });
});




// Update user
router.patch('/:id', (req, res) => {
    const id = req.params.id;
    const { password, avatar, bio, first_name, last_name } = req.body
    bcrypt.hash(password, 10, (err, hash) => {
        connection.query('UPDATE user SET password = ?, last_update_date = now(), avatar = ?, bio = ?, first_name = ?, last_name = ? WHERE iduser = ?', [hash, avatar, bio, first_name, last_name, id], (err, results) => {
            if (err) {
                res.status(500).send("Erreur lors de la modification de l'utilisateur")
            } else {
                res.status(200).json(results)
            }
        });
    })
});


// Delete user
router.delete('/:id', (req, res) => {
    const id = req.params.id
    connection.query('UPDATE user SET is_active = 0 WHERE iduser = ?', id, (err) => {
        if (err) {
            res.status(500).send("Erreur lors de la suppression de l'utilisateur")
        } else {
            res.status(200).send('Utilisateur correctement supprimé')
        }
    });
});


// Login users
router.post('/login', (req, res) => {
    let { username, password } = req.body
    connection.query('SELECT * FROM user WHERE username = ?', username, (err, results) => {
        if (!err && results.length > 0) {
            if (bcrypt.compareSync(password, results[0].password)) {
            let token = jwt.sign({ id: results[0].iduser, username: username, avatar: results[0].avatar}, 'keyboard cat 4 ever', { expiresIn : 129600 })
            res.json({
                success: true,
                err: null,
                token,
                results
            })} else {
                    res.status(500).json({
                        success: false,
                        token: null,
                        err: "Mot de passe incorrect",
                        results,
                    })
            }
        } else {
            res.status(500).json({
                success: false, 
                token: null, 
                err: "Nom d'utilisateur inexistant",
                results
            })
        }
    });
});


// Login admin only
router.post('/loginadmin', (req, res) => {
    let { username, password } = req.body
    connection.query('SELECT * FROM user WHERE username = ? AND role = ?', [username, 'admin'], (err, results) => {
        if (!err && results.length > 0) {
            if (bcrypt.compareSync(password, results[0].password)) {
            let token = jwt.sign({ id: results[0].iduser, username: username}, 'keyboard cat 4 ever', { expiresIn : 129600 })
            res.json({
                success: true,
                err: null,
                token,
                results
            })} else {
                    res.status(500).json({
                        success: false,
                        token: null,
                        err: "Mot de passe incorrect",
                        results,
                    })
            }
        } else {
            res.status(500).json({
                success: false, 
                token: null, 
                err: "Nom d'utilisateur inexistant",
                results
            })
        }
    });
});



module.exports = router;