const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect(process.env.DATABASE, 
        {},
        () => console.log('DB Connected.'))
}

module.exports = connectDB;