const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect(process.env.DATABASE, 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,   },6000000
            ,
        () => console.log('DB Connected.'))
}

module.exports = connectDB;