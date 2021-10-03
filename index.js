var express = require('express'); // Express web server framework
require('dotenv').config()
var cors = require('cors');
var app = express();
const SearchRouter = require('./controllers/search')
const RootRouter = require('./controllers/index')
const LOG = require('./utils/logger')
const { ValidateReq }  = require('./middleware/validate_request')
const { Errors } = require('./middleware/errors')


app
  .use(express.json())
  .use(cors())
	.use(ValidateReq)
	.use('/search', SearchRouter)
	.use(RootRouter)
	.use(Errors)


app.listen(8888);
LOG('Listening on 8888');