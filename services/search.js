const axios = require('axios');
const UrlEncode = require('url').URLSearchParams;
const LOG = require('../utils/logger')
const { GetTokenHeader } = require('./auth')


function GetRelevantKeys(body)
{/*
  * Parses body and extracts all keys used in spotify request
  * throws error for keys with an invalid type
  * the 'limit', 'type', 'offset' keys are optional, while the query key is required, else an error.
  */
  const bod_query  = body.query
  const bod_type   = body.type     ? body.type   : "track"
  const bod_limit  = body.limit    ? body.limit  :  10
  const bod_offset = body.offset   ? body.offset :  0

  if (!bod_query) {
    throw "EMPTY_QUERY"
  }
  else if (
    typeof bod_query !== 'string'|| 
    typeof bod_type  !== 'string'|| 
    typeof bod_limit !== 'number'||
    typeof bod_offset!== 'number') {
      throw "REQUEST_KEY_ERROR"
    }       
            
  return ({
    query: bod_query,
    type:  bod_type,
    limit: bod_limit,
    offset:bod_offset
  })
}

async function search(body)
{/*
  * Api ONLY parses the following keys in the json request anythings else is not allowed
  * "query" - containing the words to search
  * "limit" - containing the no. of items to return
  * "offset"- determines the offset for index 0
  * "type" - type of object being queried
  * 
  * parsing of body is handled by "GetRelevantKeys"
  * 
  */ 
    LOG('quering spotify');

    const params = GetRelevantKeys(body)

    const query_encoded = new UrlEncode(params);
    const req_query = query_encoded.toString();

    console.log('Request query::>', req_query);

    const url = 'https://api.spotify.com/v1/search?' + req_query;
    const token_header = await GetTokenHeader()

    const options = {
      headers: token_header,
      json: true
    };

  try {
    const result = await axios.get(url, options);
    console.log('Spotify response::>', result.status);

    LOG('done quering spotify');
    return result.data;   
  }
  catch (error) {
    LOG('error quering spotify');

    if (error.response.data) {
      throw error.response.data
    }
    throw "SPOTIFY_ERROR"
  }
}

exports.search = search;