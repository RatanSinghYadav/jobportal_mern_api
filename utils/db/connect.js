require('dotenv').config();
const mongoose = require('mongoose');
const url = process.env.Database_URL

const connectDB = async () => {
    try {
        await mongoose.connect(url);
        console.log('connected to MongoDB Database...')
    } catch (error) {
        console.log("this error coming from mongodb connection.", error)
    }
}

module.exports = connectDB;