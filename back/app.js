const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 3002;
const exjwt = require('express-jwt');
const morgan = require('morgan');

const bonsplans = require('./routes/bonsplans');
const profil = require('./routes/profil');
const user = require('./routes/user');

app.use(morgan('dev'));

//See the react auth blog in which cors is required for access
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization')
    next();
});


// Setting up bodyParser to use json and set it to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//
app.use(cors());


const jwtMW = exjwt({
    secret: 'keyboard cat 4 ever'
  });
  
  
  app.get('/', jwtMW /* Using the express jwt MW here */, (req, res) => {
    res.send('You are authenticated'); //Sending some response when authenticated
  });
  
  // Error handling 
  app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') { // Send the error rather than to show it on the console
        res.status(401).send(err);
    }
    else {
        next(err);
    }
  });
  
app.use("/user", user)
app.use("/profil", profil)
app.use("/bonsplans", bonsplans)
  
  

app.listen(PORT || 3002, err => {
    if (err) throw err;
    console.log(`Server is listening on ${PORT}`)
});