const mongoose = require('mongoose');
const advisoryDropdownModel = require('../models/advisory-dropdown.model');

const connectDB = () => {
    mongoose.connect(process.env.DATABASE,
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => console.log('DB Connected.')).then(data => {
            const data =
                { "callTypes": ["INTRADAY", "DELIVERY"], "action": ["BUY", "SELL"], "category": ["EQUITY", "FUTURES", "OPTIONS"], "nameOfShare": ["Stock A", "Stock B", "Stock C"] }
            await advisoryDropdownModel.create(data);

        })
}

module.exports = connectDB;