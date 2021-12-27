//this function filters docs w.r.t. min&max counts from request payload.
//And returns matching docs in records array
const filterCount = async (minCount, maxCount, result) => {
  const records = []
  result.map(doc => {
    
    const countSum = doc.counts.reduce((a,b) => a+b)
    
    if(countSum <= maxCount && countSum >= minCount){
      const recordsObj = {
        key : doc.key,
        createdAt : doc.createdAt,
        totalCount : countSum
      }
      records.push(recordsObj)
    }
  })
  return records
}

module.exports = {filterCount}