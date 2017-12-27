const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

let user = new Schema({
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
            required: true,
            unique: true
        },
    password:
        {
            type: String,
            required: true
        }
    // avatar:
    //     {
    //         data: Buffer,
    //         contentType: String
    //     }


}, { timestamps: true });

user.pre('save', function (next) {
    let user = this;
    //console.log(aUser);

    //only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) {
        //console.log('Inside NOT modified!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        return next();
    }


    //generate a salt
    bcrypt.genSalt(10, function (err, salt) {
        //console.log('reached salt');
        if (err)
            return next(err);
        //hash the fucking password
        bcrypt.hash(user.password, salt, function (err, hash) {
            //console.log('reached hash');
            if (err)
                return next(err);
            //override the fucking password with the hashed one
            user.password = hash;
            next();
        });
    });

});

user.methods.comparePassword = function (thePassword, callback) {
    //console.log('reached COMPAREPASSWORD');
    bcrypt.compare(thePassword, this.password, function (err, isMatch) {
        if (err)
            return callback(err);
        callback(null, isMatch);
    });
};
module.exports = mongoose.model('User', user);


