const mongoose = require('mongoose');

const connectDB = async () => {

    try {
        const result = await mongoose.connect(process.env.DATABASE_URL)
        console.log('mongodb connected');
    } catch (err) {
        console.log('mongodb connection failure.')
        throw err;
    }
     
}

module.exports = connectDB;