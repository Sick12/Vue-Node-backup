var express = require('express');
var router = express.Router();
var Product = require('../models/products');
var mongoose = require('mongoose');
var verifyToken = require('../config/jwt-middleware');


router.get('/', verifyToken, function (req, res) {
    // res.render('products');

    Product.find({}, function (err, storedProducts) {
        if (err) {
            return res.status(500).send({ error: 'Nothing to display' });
        }
        return res.status(200).send(storedProducts);

    });
    // db.collection('products').find({}).toArray(function(err, result){
    //     if(err) throw err;
    //     res.status(200).send(result);
    //     db.close();
    // });
    // mongoose.model('Product').findOne({'title':''},  function(error, exist){
    //     if(exist && !error) {
    //         res.status(200).send(exist);
    //     }
    // });
});

router.get('/add', verifyToken, function (req, res) {
    res.render('products');
});
router.post('/add', function (req, res) {
    Product.find().lean().exec(function (err, doc) {
        for (var i = 0; i < doc.length; i++) {
            if (req.body.title == doc[i].title) {
                return res.status(500).send({ error: 'Product ' + doc[i].title + ' already exists' });
                break;
            }
            //console.log(doc[i].title);
        }
        var product = new Product();
        product.title = req.body.title;
        product.price = req.body.price;
        if (req.body.description.length > 0)
            product.description = req.body.description;
        product.save(function (err, savedProduct) {
            if (err)
                return res.status(500).send({ error: "Couldn't save the product" + product });
            return res.status(200).send('Saved \n' + savedProduct);
            //console.log('saved' + savedProduct);
        });

    });


});
// Update product setDefaultsOnInsert:true - lookup
router.put('/:productId', function (req, res) {
    Product.findOne({ _id: req.params.productId }, { multi: true }).exec(function (err, product) {
        if (err)
            return res.status(500).send({ error: 'Invalid ID' });
        if (!product)
            return res.status(404).send({ error: 'No product found' });
        product.title = req.body.title;
        product.price = req.body.price;
        product.description = req.body.description;
        product.save(function (err) {
            if (err)
                return res.status(500).send({ error: 'Error' });
            return res.status(200).send({ Success: 'Product ' + product._id + ' updated' });

        });

    });
    // Product.update({_id: req.params.productId}, {title: req.body.title}).exec(function(err){
    //     if(err)
    //         return res.status(500).send('Error');
    //         res.send('Worked');
    // });

});

router.delete('/:productId', function (req, res) {
    Product.findOneAndRemove({ _id: req.params.productId }, function (err, product) {
        if (err)
            return res.status(500).send({ error: 'Invalid product ID' });
        if (!product)
            return res.status(404).send({ error: 'Product not found' });
        return res.status(200).send({ success: 'Removed product' });
    });
});


module.exports = router;



