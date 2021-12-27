/* eslint-disable no-undef */
const app = require('./app')

//initialize server
app.listen(process.env.PORT, () => {
  console.log(`Server is up on port=${process.env.PORT}`)
} )