const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const product = new Schema({
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
        default: 'No description added yet.'
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', product);