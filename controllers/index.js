const server = require('express').Router()

server.get('/', (req, res) => {
  LOG('REQUEST TO /')
  res.send('hi. make POST request to /search')
})


module.exports = server