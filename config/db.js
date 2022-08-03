const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect(process.env.DATABASE, 
        {useNewUrlParser: true, useUnifiedTopology: true},
        () => console.log('DB Connected.'))
}

module.exports = connectDB;