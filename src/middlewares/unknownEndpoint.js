//handle unknown endpoints
const unknownEndpoint = (request, response) => {
  response.status(404).send({code: 404, msg: 'invalid url', records:[]})
}

module.exports = {unknownEndpoint}