const mongoose = require('mongoose');

const connectDB = (async() =>{
    try {
        mongoose.set('strictQuery',false)
        const conn = await mongoose.connect(process.env.DATABASE);
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan)        
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
})

module.exports = connectDB;