const mongoose  = require('mongoose')
require('dotenv').config()
const mongodbUri = process.env.MONGODB

const initializedDatabase = async () => {
    
        await mongoose.connect(mongodbUri)
        .then(() => {
            console.log('Connected to Database Successfully.');
            
        })
        .catch((error) => {
            console.log('Failed to Connect Database!', error);
            
        })
    
}

module.exports = {initializedDatabase}