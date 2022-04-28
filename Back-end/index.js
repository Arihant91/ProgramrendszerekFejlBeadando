const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const passport = require('passport');
const localStrategy = require('passport-local').Strategy
const expressSession = require('express-session');

const app = express();

const port = process.env.PORT || 3000;
const dbUrl = 'mongodb+srv://admin:admin@cluster0.rria3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(dbUrl)

mongoose.connection.on('connected', () => {
    console.log('db csatlakoztatva')
})

mongoose.connection.on('error', (err) => {
    console.log('Hiba tortent', err);
})

require('./product.model');
require('./user.model');

const userModel = mongoose.model('user');

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({}));

const whiteList = ['http://localhost:4200'];


app.use((req, res, next) =>{
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS'){
        res.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Allow-Max-Age', '3600');
    }
    next();
})

var corsOptions = {
    origin: function (origin, callback) {
      if (whiteList.indexOf(origin) !== -1 || !origin) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin', 
    'Origin', 'Accept']
  };

app.use(cors(corsOptions));

app.use(expressSession({secret: 'prf2021lasssananodejsvegereerunk', resave: true}))
app.use(passport.initialize());
app.use(passport.session());

passport.use('local', new localStrategy(function(username, password, done) {
    userModel.findOne({username: username}, function(err, user) {
        if(err) return done('Hiba lekeres soran', null);
        if(!user) return done('Nincs ilyen felhasznalonev', null);
        user.comparePasswords(password, function(err, isMatch) {
            if(err) return done(error, false);
            if(!isMatch) return done('hibas jelszo', false);
            return done(null, user);
        });
    })
}));

passport.serializeUser(function(user, done) {
    if(!user) return done('nincs megadva beleptetheto felhasznalo', null);
    return done(null, user);
});

passport.deserializeUser(function(user, done) {
    if(!user) return done("nincs user akit kileptethetnenk", null);
    return done(null, user);
});

app.use('/', require('./routes'));

app.use((req, res, next) => {
    console.log('ez a hibakezelo');
    res.status(404).send('A kert eroforras nem talalhato')
})

app.listen(port, () => {
    console.log('The servicer is running!')
});