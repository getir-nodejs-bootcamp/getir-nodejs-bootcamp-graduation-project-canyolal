const assingmentRouter = require('express').Router()
const {validate} = require('../middlewares/validate')
const {postValidation} = require('../validations/filterdata')
const {postRequest} = require('../controllers/filterdata')

//method specification
assingmentRouter.route('/').post(validate(postValidation,'body'), postRequest)

module.exports = assingmentRouter