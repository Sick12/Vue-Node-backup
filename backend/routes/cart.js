var express = require('express');
var router = express.Router();
var Cart = require('../models/carts');

router.get('/', function(req, res) {
    res.send('Cart page');
});



module.exports = router;