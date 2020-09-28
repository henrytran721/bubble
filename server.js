const express = require('express');
const session = require('express-session');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const dotenv = require('dotenv').config();
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const async = require('async');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var User = require('./models/user');

// routes // 
var indexRouter = require('./routes/index');
var signupRouter = require('./routes/signup');

const app = express();

const dev_db_url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-gevd4.azure.mongodb.net/bubble?retryWrites=true&w=majority`;
const mongoDb = process.env.MONGODB_URI || dev_db_url;
mongoose.set('useCreateIndex', true)
mongoose.connect(mongoDb, {useUnifiedTopology: true, useNewUrlParser: true});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));


passport.use(
    new LocalStrategy((username, password, done) => {
        User.findOne({username: username}, (err, user) => {
            if(err) {
                return done(err);
            }
            if(!user) {
                return done(null, false, {msg: 'Incorrect username'});
            }
            bcrypt.compare(password, user.password, (err, res) => {
                if(res) {
                    return done(null, user);
                } else {
                    return done(null, false, {msg: 'Incorrect Password'});
                }
            })
        })
    })
)

passport.serializeUser(function(user, done) {
    console.log('SerializeUser function called.');
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });


app.use(cors({
    origin: "https://bubble-henri-app.herokuapp.com/",
    credentials: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: "dole-whip", resave: false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', indexRouter);
app.use('/signup', signupRouter);

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
    });
}

app.post('/login', passport.authenticate('local'), (req, res, next) => {
    // call req.login for callback is needed in order to call serialize and deserialize functions
    req.session.user = req.user;
    sesh = req.session;
    res.json(req.user);
})

app.post('/logout', (req, res, next) => {
    let redirect = '/';
    res.send({redirect});
})


app.listen(`${process.env.PORT}` || 8080, () => {
    console.log('app is running on port 8080');
})