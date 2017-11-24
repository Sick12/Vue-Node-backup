var express = require('express');
var router = express.Router();

var WishList = require('../models/wishlists');

router.get('/', function(req, res){
    res.send('Wish list page');
});


module.exports = router;