var express = require('express'); // Express web server framework
require('dotenv').config()
var cors = require('cors');
var app = express();
const SearchRouter = require('./routes/search')
const IdRouter = require('./routes/id')
const RootRouter = require('./routes/index')
const SearchGenius = require('./routes/search_genius')

const LOG = require('./utils/logger')
const { ValidateReq }  = require('./middleware/validate_request')
const { Errors } = require('./middleware/errors')


app
  .use(express.json())
  .use(cors())
	.use(ValidateReq)
	.use('/search', SearchRouter)
	.use('/id', IdRouter)

	// .use('/api/search')
	.use(RootRouter)
	.use(Errors)


app.listen(8888);
LOG('Listening on 8888');