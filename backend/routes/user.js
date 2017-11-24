var express = require('express');
var router = express.Router();
//var mongoose = require('mongoose');
// var db = mongoose.connect('mongodb://localhost/testDB', {
//     useMongoClient: true
// });

var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var verifyToken = require('../config/jwt-middleware');
var secret = 'papoi';

//Import models
var User = require('../models/users');


//router.use('/protected',verifyToken);

router.get('/', verifyToken, function (req, res) {

    // var user = db.collection('users').find().toArray(function(err, storedUsers) {
    // if(err) {
    //     return res.status(500).send({error:"Something blew up"});
    // }else {
    //     return res.status(200).send(storedUsers);
    // }
    // });
    //both methods work
    User.find({}, function (err, storedUsers) {
        if (err) {
            return res.status(500).send({ error: 'No users found' });
        } else {
            return res.status(200).send(storedUsers);
        }
    });

});

router.get('/add', function (req, res) {
    res.render('register');
});

router.post('/add', function (req, res) {
    User.find().lean().exec(function (err, doc) {
        for (var i = 0; i < doc.length; i++) {
            if (req.body.username == doc[i].username || req.body.email == doc[i].email) {
                return res.status(500).send({ error: 'User ' + doc[i].username + ' or email address ' + doc[i].email + ' already exists' });
                break;
            }
            //console.log(doc[i].title);
        }
        var user = new User();
        user.username = req.body.username;
        user.email = req.body.email;
        user.password = req.body.password;
        user.save(function (err, savedUser) {
            if (err)
                return res.status(500).send({ error: "Couldn't save the user" + user });
            return res.status(200).send('Saved \n' + user);
        });

    });
    // User.findOne({ username: req.body.username, email: req.body.email }, function (err, user) {
    //     if (!user)
    //         return res.status(500).send({ error: "Couldn't save the user" + user });
    //     var user = new User();
    //     user.username = req.body.username;
    //     user.email = req.body.email;
    //     user.password = req.body.password;
    //     user.save(function (err, savedUser) {
    //         if (err)
    //             return res.status(500).send({ error: "Couldn't save the user" + user });
    //         return res.status(200).send('Saved \n' + user);

    //     });
    //  });
    });


    router.get('/login', function (req, res) {
        res.render('login');

    });

    router.post('/login', function (req, res) {
        // User.find().lean().exec(function (err, doc) {
        //     for (var i = 0; i < doc.length; i++) {
        //         if (req.body.username == doc[i].username && req.body.password == doc[i].password) {


        //             // return res.status(200).json({
        //             //     headers:{
        //             //       'x-access-token':token,
        //             //         message:'Logged in'
        //             //     }
        //             // });
        //             var token = jwt.sign({ username: req.body.username }, secret, { expiresIn: '1h' });
        //             return res.status(200).send('You\'re now logged in ' + 'with the username: ' + doc[i].username + ' and password: ' + doc[i].password + ' \nJSON token: \n' + token);
        //             //return res.redirect('/user');


        //         }
        //     }
        //     return res.status(404).send({ error: 'Invalid username or password: ' + req.body.username });
        // });
        User.findOne({ username: req.body.username, password: req.body.password }, function (err, user) {
            if (!user)
                return res.status(404).send({ error: 'Invalid username or password: ' + req.body.username });
            var token = jwt.sign({ username: req.body.username }, secret, { expiresIn: '1h' });
            return res.json({
                token: token
            });
        });
    });


    router.get('/profile', function (req, res) {
        res.send('Profile page');
    });

    router.put('/profile/:userId', function (req, res) {
        User.findByIdAndUpdate({ _id: req.params.userId }, { username: req.body.username, email: req.body.email }, function (err, user) {
            if (err)
                return res.status(500).send({ error: err });
            if (!user)
                return res.status(404).send({ error: 'User not found' });
            user.save(function (err, updateUser) {
                if (err)
                    return res.status(500).send({ error: err });
                return res.status(200).send({ success: 'User updated' });
            });
        });
    });

    router.delete('/profile/:userId', function (req, res) {
        User.findByIdAndRemove({ _id: req.params.userId }, function (err, user) {
            if (err)
                return res.status(500).send({ error: 'Invalid user ID' });
            if (!user)
                return res.status(404).send({ error: 'User not found' });
            return res.status(200).send({ success: 'User succesfully deleted' });
        });
    });

    // function userRequired(req, res, next) {
    //     if (!req.user) return res.status(401).send({message: 'You must be logged in to view this page' });
    //     return next();
    //   }

    module.exports = router;