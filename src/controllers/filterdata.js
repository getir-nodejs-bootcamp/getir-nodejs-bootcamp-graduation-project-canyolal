const {getAllDocs} = require('../services/filterdata')
const {filterCount} = require('../utils/helper')

const postRequest =  (request,response) => {

  //get docs from db getAllDocs returns a promise
  getAllDocs(request.body)
    .then(async result => {
      
      if(!result) return response.status(500).json({code:501, msg: 'error fetching from db'})

      try{
        //filter docs
        const records = await filterCount(request.body.minCount, request.body.maxCount, result)

        if(records.length === 0){//if no matching results
          return response.status(200).json({code:0, msg: 'no match', records})
        }else{
          return response.status(200).json({code:0, msg: 'success', records})
        }
      }catch(e){//error while filtering
        console.error(e)
        return response.status(500).json({code:500, msg: 'error while processing'})
      }
    }).catch((e) => {//error while fetching data from db
      console.error(e)
      response.status(500).json({code:501, msg: 'error fetching from db'})
    })
}

module.exports = {postRequest}