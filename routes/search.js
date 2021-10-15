const { search: search_spotify } = require("../services/search_spotify");
const { search_genius } = require("../services/search_genius");
const LOG = require('../utils/logger');
const { EmptyResultError } = require("../services/custom_errors");
const Search = require('express').Router()


Search.post('/', async function (req, res, next)
{
  const { path, q } = req.query // Uses query parameters as opposed to body. path specifies whether genius or spotify, q specifies query
  console.log('req query::>', req.query)

  LOG('REQUEST TO /api/search')

  if (path === 'genius') {

    try {
      const resp = await search_genius(q)
      console.log('response::>',resp)

      if (!resp.response.hits.length) {
        throw new EmptyResultError()
      }

      return res.send(resp)
    }
    catch (error) {
      console.log('object')
      next(error)
    }
  }
  else {
    const body = req.body
    console.log('req body::>', body)

    try {
      var ans = await search_spotify(body)

      if (ans.tracks.items.length == 0) {
        throw new EmptyResultError()
      }

      return res.send(ans)
    }
    catch (error) {
      next(error)
    }

  }
})

module.exports = Search