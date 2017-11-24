var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
    username:
    {
        type: String,
        trim: true,
        required: true,
        unique: true
    },

    email:
    {
        type: String,
        trim: true,
        required: true
    },
    password:
    {
        type: String,
        required: true
    }


});

module.exports = mongoose.model('User', user);