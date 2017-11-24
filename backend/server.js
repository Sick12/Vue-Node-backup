var express = require('express');
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/testDB', { useMongoClient: true });
var Schema = mongoose.Schema;
var ejs = require('ejs');
var path = require('path');
var fs = require('fs');
var jwt = require('jsonwebtoken');
//var expressJwt = require('express-jwt');

//Import models
var Cart = require('./models/carts');
var Product = require('./models/products');
var SaleItems = require('./models/saleItems');
var User = require('./models/users');
var WishList = require('./models/wishlists');

//app.locals.user = User;
//Export variables globaly (to views) FUCKING EJS
app.use(function(req, res, next){
    var x ='test_global';
    res.locals.user = x;
    next();
});
// app.use(function(req, res, next){
//     var x ='mycock';
//     res.locals.token = jwt.sign({ username: req.body.username }, secret, { expiresIn: '1h' });
//     next();
// });
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
}

    app.use(allowCrossDomain);
     
//Body-parser middleware

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Link project with html(ejs) and css static files
app.set('views', path.join(__dirname, 'view'));
app.use(express.static('view'));
app.set('view engine', 'ejs');

//Import routes
var cart = require('./routes/cart');
app.use('/cart', cart);
var product = require('./routes/product');
app.use('/product', product);
var user = require('./routes/user');
app.use('/user', user);
var wishList = require('./routes/wishlist');
app.use('/wishlist', wishList);



//var imgPath = require('./view/Images');
// var readImg = fs.readFileSync('./view/Images/iphoneImg.jpg');
// console.log(readImg); ADD IMAGES TO PRODUCTS

// User.find().lean().exec(function(err, doc) {
//     console.log(doc[2].username);
// });


app.get('/', function (req, res) {
    res.render('index');
    
});

app.listen(port, function () {
    console.log('Server started on port: ' + port);
});



//STORE TOKEN CLIENT SIDE(PROBABLY EJS) USING localStorage (Storage)
//How to use express variables in ejs
//add Eventhandler(click) in login to store on click
