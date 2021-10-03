const LOG = require('../utils/logger')
const { GetTrack } = require('../services/track')

const IdRouter = require('express').Router()

IdRouter.post('/', async function(req, res, next) {
  const body = req.body
  LOG('REQUEST TO /id')

  console.log('req body', body)

  try {
    var ans  = await GetTrack(body) 
    
    res.send(ans)
  }
  catch (error) {
    next(error)
  }
})

IdRouter.get('/', (req,res) => {
  res.send('make post request to get track info')
})



module.exports = IdRouter