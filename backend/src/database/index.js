require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(`${process.env.DB_DIALECT}://${process.env.DB_IP}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,{
  serverSelectionTimeoutMS: 3000, // increase timeout limit to 3 seconds
  useNewUrlParser: true,
  useUnifiedTopology: true
}) 
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));


mongoose.Promise = global.Promiseshow

module.exports = mongoose;