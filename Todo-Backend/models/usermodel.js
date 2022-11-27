//import mongoose to create mongoose model
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const validator = require('validator');

//create Schema
const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,  
        unique: true
    },
    naam: {
        type: String,
        required: true, 
        unique: true
    },
    chabbi: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
              return validator.isStrongPassword(value, [
                { minLowercase: 1, minUppercase: 1, returnScore: true },
              ])
            },
            message: 'Strong Password needed'
          },
    },
    date: {
        type: Date,
        required: true
    },
    role: {
        type: String,
        required: true
    },
}, { collection: 'beboharkari' })

//export this Schema

 
//make static signup method
UserSchema.statics.signup = async function (email, chabbi) {
    //validation using validator
    if (!email || !chabbi) {
        throw Error("All fields must be filled.")
    }
    if (!validator.isEmail(email)) {
        throw Error("Email is not valid")
    }
    if (!validator.isStrongPassword(chabbi)) {
        throw Error("Password is not strong enough")
    }

    const exists = await this.findOne({ email });
        if (exists) {
            throw Error("This email is already exist ");
        }
        //generating salt for extra security of chabbi and hashing chabbi
        const salt = await bcrypt.genSalt(10);

        const hash = await bcrypt.hash(chabbi, salt);
        //now storing hash chabbi and  the email that the user  enter, in the databases and return the user
        const user = await this.create({ email, chabbi: hash });
        return user;
};

//static login method
UserSchema.statics.login = async function (email, chabbi) {
    if (!email || !chabbi) {
        throw Error("All fields must be filled")
    }
    const user = await this.findOne({ email })
    if (!user) {
        throw Error("Incorrect email")
    }
    const match = await bcrypt.compare(chabbi, user.chabbi)
    if (!match) {
        throw Error("Incorrect Password")
    }
    return user

}


module.exports = mongoose.model('beboharkaris', UserSchema);