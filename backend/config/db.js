const mongoose = require('mongoose')
const connectDB = async () => {
    try {
        mongoose.set('strictQuery', true)
        const conn = await mongoose.connect(process.env.MONGODB_URL)
        console.log(process.env.MONGODB_URL)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
        console.log("Not able connect to the db ")
        process.exit(1)
    }
}

module.exports = connectDB