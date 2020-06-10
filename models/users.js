const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true,
        lowercase : true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password : {
        type : String,
        unique : true, 
        required : true,
        trim : true,
        validate(value) {
            if(value.toLowerCase().includes("password")) {
                throw new Error("The passowrd can't contain \"password\" string");
            } else if(value.length <= 6) { // or use min length 
                throw new Error("The password must be greater than 6")
            }
        }
    }
}, {
    timestamps : true
});


userSchema.pre('save', async function(next) {
    const user = this;  

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

const User = mongoose.model('users', userSchema);

module.exports = User;