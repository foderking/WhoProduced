const LOG = require('../utils/logger')
const { GetTrack: GetTrackSpotify } = require('../services/get_track_spotify')
const { GetTrackGenius } = require('../services/get_track_genius')
const Track = require('express').Router()


Track.post('/', async function (req, res, next)
{
  LOG('REQUEST TO /id')
  const { id } = req.query

  if (id) {
    console.log(id)

    try {
      const ans = await GetTrackGenius(id)
      return res.send(ans)
    }
    catch (error) {
      next(error)
    }
  }
  else {
    const body = req.body
    console.log('req body', body)

    try {
      var ans = await GetTrackSpotify(body)
      res.send(ans)
    }
    catch (error) {
      next(error)
    }

  }
})

module.exports = Track