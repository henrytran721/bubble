var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bcrypt = require('bcryptjs');

router.post('/', function(req, res, next) {
        // use bcrypt to hash our req.body.password into hashed parameter
        bcrypt.hash(req.body.password, 10, (err, hashed) => {
            if(err) {
                return next(err);
            } else {
                // create a user object and pass in our data
                const user = new User({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    zipcode: req.body.zip,
                    password: hashed
                })
                // if user is found then send an error to client, else save the user
                User.findOne({email: req.body.email}, (err, example) => {
                    if(err) {console.log(err)};
                    if(example) {
                        res.send(`Email: ${req.body.email} has already been taken, please try another one.`);
                    } else {
                        // send our data to the database
                        user.save((err) => {
                            if(err) {
                                return next(err); 
                            } else {
                                let redirect = { redirect: '/'}
                                res.send({redirect});
                            }
                        })
                    }
            });
            }
        })
  });


