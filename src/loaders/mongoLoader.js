/* eslint-disable no-undef */
const mongoose = require('mongoose')

const mongoLoader = async () => {

  //connect mongodb
  try{
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('connection to MongoDB is successful!')
  }catch(e){
    console.log('Connection to MongoDB is failed',e)
  }
}

module.exports = { mongoLoader }