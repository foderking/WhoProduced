const  {search}  = require("../services/search");
const LOG = require('../utils/logger')

const SearchRouter = require('express').Router()

SearchRouter.post('/', async function(req, res, next) {
  const body = req.body
  LOG('REQUEST TO /search')

  console.log('req body', body)

  try {
    var ans  = await search(body) 
    
    if (ans.tracks.items.length == 0 ) {
      throw 'EMPTY_SPOTIFY_RESPONSE'
    }

    res.send(ans)
  }
  catch (error) {
    next(error)
  }
})

SearchRouter.get('/', (req,res) => {
  res.send('Make a post request to this path')
})



module.exports = SearchRouter