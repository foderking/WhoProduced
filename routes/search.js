const  {search: search_spotify}  = require("../services/search_spotify");
// const  { search_genius}  = require("../services/search_genius");
const LOG = require('../utils/logger')

const SearchRouter = require('express').Router()

SearchRouter.post('/', async function(req, res, next) {
  const { path, q } = req.query // Uses query parameters as opposed to body. path specifies whether genius or spotify, q specifies query
  const body = req.body
  LOG('REQUEST TO /search')

  console.log('req body', body)

  try {
    var ans  = await search_spotify(body) 
    
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