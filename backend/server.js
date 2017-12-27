const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost/testDB', { useMongoClient: true }, function () { console.log('MongoDB started'); });
const multer = require('multer');
//var upload = multer({ dest: '../frontend/src/assets/' });

const Schema = mongoose.Schema;
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//Multer image upload (not working with mongoDB?) might need GridFs
//Set Storage Engine
const storage = multer.diskStorage({
    destination: './view/Images/',
    filename: (req, file, callback) => {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

//Init upload 

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: (req, file, callback) => {
        checkFileType(file, callback);
    }
}).single('myImage');

//Check file type
function checkFileType(file, callback) {
    //Allowed extensions
    const filetypes = /jpeg|jpg|png|gif/;
    const extensionName = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extensionName && mimetype)
        return callback(null, true);
    return callback('Invalid Format: The file must be .JPEG, .JPG, .PNG or .GIF');
};
app.get('/test-upload', (req, res) => {
    res.render('uploads');
});
app.post('/test-upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.render('uploads', {
                msg: err
            });
        }
        else if (req.file == undefined) {
            res.render('uploads', {
                msg: 'Error: Please select a file!'
            });
        } else {
            res.render('uploads', {
                file: `Images/${req.file.filename}`
            });
        }
    });

});
//Multer image upload (not working with mongoDB?) ^

//Import models

const Cart = require('./models/carts');
const Product = require('./models/products');
const SaleItems = require('./models/saleItems');
const User = require('./models/users');
const WishList = require('./models/wishlists');

//app.locals.user = User;
//Export variables globaly (to views) FUCKING EJS
// app.use(function (req, res, next) {
//     var x = 'test_global';
//     res.locals.user = x;
//     next();
// });



var allowCrossDomain = function (req, res, next) {
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
const cart = require('./routes/cart');
app.use('/cart', cart);
const product = require('./routes/product');
app.use('/product', product);
const user = require('./routes/user');
app.use('/user', user);
const wishList = require('./routes/wishlist');
app.use('/wishlist', wishList);


// User.find().lean().exec(function(err, doc) {
//     console.log(doc[2].username);
// });


app.get('/', function (req, res) {
    res.render('index');

});

app.listen(port, function () {
    console.log('Server started on port: ' + port);
});

