var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var product = new Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    price: {
        type: Number,
        required: true,
        trim:true
    },
    description: {
        type: String,
        required:true,
        default: 'No description added yet.'
    },
    likes: {
        type: Number,
        default: 0
    },
    review: {
        type: String,
        default:'No review yet.'
    }


});

module.exports = mongoose.model('Product', product);