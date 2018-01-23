const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const mongo = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var Grid = require('gridfs');
const db = mongoose.connect('mongodb://localhost/testDB', { useMongoClient: true }, (err) => {
    if (err)
        throw err;
    console.log('MongoDB started');
});

//*******************Remove if broken****************************//

let multiparty = require('multiparty');
app.use((req, res, next) => {
    let form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
        // console.log(files);
        if (files && files.file && files.file.length > 0)
            req.files = files.file;
        next();
       // console.log(req.files[0].originalFilename);
    });
});

// {
//     file:
//     [{
//         fieldName: 'file',
//         originalFilename: 'guess-it-works.jpg',
//         path: 'C:\\Users\\syck9\\AppData\\Local\\Temp\\lx9KS61Zb79i4iGgL0OpWmdV.jpg',
//         headers: [Object],
//         size: 264050
//     }]
// };


db.once('open', () => {
    console.log('Connection opened');
    let gfs = Grid(db.db, mongoose.mongo);
    app.post('/upload-files', (req, res) => {
        //console.log(req.files);
        let source = req.files[0].path;

        gfs.fromFile({ filename: req.files[0].originalFilename }, source, (err, file) => {
            //console.log('saved %s to GridFS file %s', source, file._id);
            // console.log(file);
            gfs.readFile({ _id: file._id }, (err, data) => {
                // console.log(file._id);
            });
        });
        res.json({ success: 'File uploaded successfully' });
    });
    app.get('/download/:fileId', (req, res) => {
        gfs.createReadStream({ _id: req.params.fileId }).pipe(res);
    });
});


//*******************Remove if broken****************************//
// db.once('open', () => {
//     console.log('Opened Mongo connection');
//     let gfs = Grid(db.db, mongoose.mongo);
//     // app.get('/upload-files/:fileId', (req, res) => {
//     //     let fileId = req.params.fileId;
//     //     gfs.findOne({ _id: fileId }, (err, file) => {
//     //         if (err)
//     //             return res.status(500).send('No file found');
//     //         return res.status(200).send(file);
//     //     });
//     // });
//     //works ^
//     app.post('/upload-files', (req, res, next) => {
//         //let uploadedFile = req.files;
//         console.log(req.files);
//         let writeStream = gfs.createWriteStream({
//             filename: 'Image' + '-' + Date.now() + '.jpg',
//             mode: 'w',
//             chunkSize: 1024,
//             content_type: req.files.mimetype
//         });
//         console.log('after WRITE STREAM');
//         //fs.createReadStream().pipe(writeStream);
//         writeStream.on('close', (err, file) => {
//             if (err)
//                 return console.log(err);
//             return console.log(file);
//         });
//     });
// });


// db.once('open', () => {
//     let gfs = Grid(db.db, mongoose.mongo);
//     let writeStream = gfs.createWriteStream({
//         filename: 'RandomName.jpg',
//         mode: 'w',
//         content_type: 'mimetype',
//         chunkSize: 1024
//     });
//     fs.createReadStream('./view/Images/iphoneImg.jpg').pipe(writeStream);
//     let readStream = gfs.createWriteStream({
//         filename: 'RandomName.jpg'
//     });
//     fs.createWriteStream(path.join(__dirname, './view/Images/NEWIMAGE' + '-' + Date.now()+ '.JPG'));
//     writeStream.on('close', (file) => {
//         console.log('File added' + file.filename);
//     });
// });



// db.once('open', () => {
//     let gfs = Grid(db.db, mongoose.mongo);
//     console.log("Connection opened");

//     gfs.exist({ _id: '5a4e331ec0943038d8ac720098' }, function (err, found) {

//         if (err)
//             throw err;
//         if (found) {
//             gfs.findOne({ _id: '5a4e331ec0943038d8ac7200' }, (err, file) => {
//                 if (err)
//                     throw err;
//                 return console.log('Filename already exists \n', file);
//             });
//         }


//         else {
//             let writestream = gfs.createWriteStream({
//                 filename: 'Image.jpg',
//                 mode: 'w',            //default
//                 chunkSize: 1024,                  //type  mimetype
//                 content_type: 'mimetype'
//             });
//             //streaming from gridfs
//             let readstream = gfs.createReadStream({
//                 filename: 'Image.jpg'
//             });

//             fs.createReadStream('./view/Images/iphoneImg.jpg').pipe(writestream);
//             fs.createWriteStream(path.join(__dirname, '../WrittenFile/WrittenImage.jpg'));
//             writestream.on('close', (file) => {
//                 console.log(file.filename + ' Added to db!');
//             });
//         }
//     });
// });






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


/** Seting up server to accept cross-origin browser requests */
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


app.get('/', function (req, res) {
    res.render('index');

});

app.listen(port, () => {
    console.log('Server started on port: ' + port);
});

