const mongoose = require('mongoose');
const advisorySchema = new mongoose.Schema({

    category: {
        type: String,
        required: true,
        unique: false,
        enum: ['EQUITY', 'FUTURES', 'OPTIONS']
    },
    typeOfCall: {
        type: String,
        required: true,
        unique: false,
        enum: ['INTRADAY', 'DELIVERY'],
        default: 'INTRADAY'
    },
    action: {
        type: String,
        required: true,
        unique: false,
        enum: ['BUY', 'SELL']
    },
    timeOfCall: {
        type: String,
        required: true
    },
    nameOfShare: {
        type: String,
        required: true
    },
    rate: {
        type: String,
        required: true
    },
    stopLoss: {
        type: Number,
        required: true,
        // default: -1
    },
    target: {
        type: Number,
        required: true
    },
    secondTarget: {
        type: Number,
        required: true
    },
    
    strikePrice: { // for options
        type: Number,
        required: false
    },
    expiryDate: { // for options
        type: String,
        required: false,
        default: Date.now
    },
})

module.exports = mongoose.model('advisory', advisorySchema);
