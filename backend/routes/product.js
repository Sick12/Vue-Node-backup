const express = require('express');
const router = express.Router();
const Product = require('../models/products');
const mongoose = require('mongoose');
const verifyToken = require('../config/jwt-middleware');


router.get('/', function (req, res) {
    // res.render('products');

    Product.find({}, function (err, storedProducts) {
        if (err)
            return res.status(500).send({ error: 'Nothing to display' });
        return res.status(200).send(storedProducts);
    });
});

router.get('/one-product/:productId', (req, res) => {
    Product.findOne({ _id: req.params.productId }, (err, product) => {
        if (err)
            res.status(500).send({ error: 'Error in finding your product' });
        res.status(200).send(product);
    });
});
router.get('/add', function (req, res) {
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
        let product = new Product();
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
router.put('/update/:productId', function (req, res) {
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

router.delete('/delete/:productId', function (req, res) {
    Product.findOneAndRemove({ _id: req.params.productId }, function (err, product) {
        if (err)
            return res.status(500).send({ error: 'Invalid product ID' });
        if (!product)
            return res.status(404).send({ error: 'Product not found' });
        return res.status(200).send({ success: 'Removed product' });
    });
});


module.exports = router;



