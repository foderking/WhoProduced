const axios = require('axios');
const LOG = require('../utils/logger')
const { GetTokenHeader } = require('./auth_genius');
const { EmptyQueryError, RequestKeyError, GeniusRequestError } = require('./custom_errors');


function ValidateQuery(query)
{/*
  * Validates the query param
  */
  if (!query) {
    throw new EmptyQueryError()
  }
  if (typeof query !== 'string') {
    throw new RequestKeyError()
  }       
            
  return query
}

async function search(query)
{
  LOG('quering genius');

  const r_query = ValidateQuery(query)
  console.log('Request query::>', r_query);

  const url = 'https://api.genius.com/search?' + 'q=' +  r_query;

  const token_header = await GetTokenHeader()

  const options = {
    headers: token_header,
    json: true
  };

  try {
    const result = await axios.get(url, options);
    console.log('Genius response::>', result.status);

    LOG('done querying genius');
    return result.data;   
  }
  catch (error) {
    LOG('error quering genius');
    console.log("Error::>", error.response.data)
    // error.response.data => {
    //   meta: {
    //     status: 401,
    //     message: 'This call requires an access_token. Please see: https://genius.com/developers'
    //   }
    // }
    throw new GeniusRequestError()
  }
}

exports.search_genius = search;