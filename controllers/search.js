const  {search}  = require("../services/search");
const LOG = require('../utils/logger')

const SearchRouter = require('express').Router()

SearchRouter.post('/', async function(req, res) {
  const body = req.body
  LOG('REQUEST TO /search')

  // handles when request doesn't contain valid data
  if (!body || Object.keys(body).length === 0 ) {
    console.log('empty object')
    return res.status(404).send({"Error":'No Body Present In Request'})
  }

  console.log('req body', body)

  try {
    var ans  = await search(body) 
    
    if (ans.tracks.items.length == 0 ) {
      console.log('empty spotify object')
      return res.json({"Error": "No Result From Spotify Api", "name": "EMPTY_SPOTIFY_RESPONSE"})
    }

    res.send(ans)
  }
  catch (error) {
    console.log('error searching', error.response.data)
    res.status(400).json(error.response.data)
  }
})

SearchRouter.get('/', (req,res) => {
  res.send('Make a post request to this path')
})



module.exports = SearchRouter