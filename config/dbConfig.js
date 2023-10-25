const mongoose = require("mongoose");
const dotenv = require('dotenv')
dotenv.config()

async function connectDB() {
    try {
        await mongoose.connect(process.env.DATABASE_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
    } catch (error) {
        console.error(error);
    }
}

module.exports = connectDB
