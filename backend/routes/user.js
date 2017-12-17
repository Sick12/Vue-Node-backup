var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var verifyToken = require('../config/jwt-middleware');
var secret = 'papoi';

//Import models

var User = require('../models/users');



router.get('/', verifyToken, function (req, res) {
    User.find({}, function (err, storedUsers) {
        if (err) {
            return res.status(500).send({ error: 'No users found' });
        } else {
            return res.status(200).send(storedUsers);
        }
    });

});

router.get('/oneUser/:userId', function (req, res) {
    User.findOne({ _id: req.params.userId }, function (err, storedUser) {
        if (err) {
            return res.status(500).send({ error: 'No users found' });
        } else {
            return res.status(200).send(storedUser);
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
        user.save(function (err) {
            if (err)
                return res.status(500).send({ error: "Couldn't save the user" + user });
            return res.status(200).send('Saved \n' + user);
        });

    });
});


router.get('/login', function (req, res) {
    res.render('login');

});

router.post('/login', function (req, res) {
    User.findOne({ username: req.body.username }, function (err, user) {
        if (!user)
            //return res.status(404).send({ error: 'Invalid username or password: ' + req.body.username });
            return res.status(500).send({ error: 'Invalid credentials' });
        user.comparePassword(req.body.password, function (err, isMatch) {
            if (err) {
            } else {
                if (!isMatch)
                    return res.status(500).send({ error: 'Invalid password' });
                var token = jwt.sign({ username: req.body.username }, secret, { expiresIn: '1h' });
                return res.json({
                    token: token
                });
            }

        });
    });
});


router.get('/profile', function (req, res) {
    res.send('Profile page');
});

router.put('/update-user/:userId', function (req, res) {
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

router.delete('/delete-user/:userId', function (req, res) {
    User.findByIdAndRemove({ _id: req.params.userId }, function (err, user) {
        if (err)
            return res.status(500).send({ error: 'Invalid user ID' });
        if (!user)
            return res.status(404).send({ error: 'User not found' });
        return res.status(200).send({ success: 'User succesfully deleted' });
    });
});

module.exports = router;