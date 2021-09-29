
var express = require('express'); // Express web server framework
require('dotenv').config()
var cors = require('cors');
var app = express();
const SearchRouter = require('./controllers/search')
const RootRouter = require('./controllers/index')
const LOG = require('./utils/logger')


app
  .use(express.json())
  .use(cors())
	.use('/search', SearchRouter)
	.use(RootRouter)




app.listen(8888);
LOG('Listening on 8888');