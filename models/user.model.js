const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        // unique: true,
        // min: 3,
        // max: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // max: 100
    },
    password: {
        type: String,
        required: true,
        // min: 3,
        // max: 50
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Others']
    },
    dateOfBirth: {
        type: Date
    },
    profilePicture: {
        type: String,
        default: ''
    },

    isAdmin: {
        type: Boolean,
        default: false
    },

    addressLine1: {
        type: String,
        max: 50
    },
    addressLine2: {
        type: String,
        max: 50
    },
    city: {
        type: String,
        max: 50
    },
    state: {
        type: String,
        max: 50
    },
    country: {
        type: String,
        max: 50
    },
    pincode: {
        type: String,
        max: 50
    },
    contact: {
        type: String,
        unique: true,
        max: 50
    },
    about: {
        type: String
    }
}, {timestamps: true})

userSchema.statics.hashPassword = async function (password){
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

userSchema.statics.isValid = async function (hashedPassword, password) {
    console.log(hashedPassword, password);
    return await bcrypt.compare(hashedPassword, password);
}

module.exports = mongoose.model('user', userSchema);
