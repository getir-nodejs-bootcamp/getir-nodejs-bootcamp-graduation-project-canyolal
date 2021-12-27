const joi = require('joi')
  .extend(require('@joi/date'))

//set input requirements
const postValidation = joi.object({
  startDate: joi.date().format('YYYY-MM-DD').required(),
  endDate: joi.date().min(joi.ref('startDate')).format('YYYY-MM-DD').required(),
  minCount: joi.number().min(0).less(joi.ref('maxCount')).required(),
  maxCount: joi.number().min(0).required()
})

module.exports= { postValidation }