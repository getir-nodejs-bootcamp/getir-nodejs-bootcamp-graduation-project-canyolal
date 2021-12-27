const mongoose = require('mongoose')

//define records collection's schema
const recordsSchema = mongoose.Schema({
  key: String,
  createdAt: Date,
  counts: [Number],
  value: String
})

module.exports = mongoose.model('records', recordsSchema)