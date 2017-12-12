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
        trim: true
    },
    description: {
        type: String,
        //required: true,
        default: 'No description added yet.'
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', product);