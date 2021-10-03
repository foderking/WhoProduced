const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const axios = require('axios');
const SearchParams = require('url').URLSearchParams;;
const { ClientCredentials } = require('simple-oauth2')
const LOG = require('../utils/logger')

const auth_config = {
  client: {
    id: client_id,
    secret:  client_secret,
  },
  auth: {
    tokenHost: 'https://accounts.spotify.com',
          tokenPath: '/api/token'
  }
}

const client = new ClientCredentials(auth_config); // we are using client credentials authorisation

let access_token = null;

// converts access token to the authorization header => { 'authorization': 'Bearer jsglksgkjlflsdkfssfkffs'}
const TokenHeader = (access_token) => ({ 'Authorization': `${access_token.token.token_type} ${access_token.token.access_token}` });

async function NewToken()
{ // Return valid access token. called when token is expired or on first request
  try {
    LOG('getting New token');
    const access_token = await client.getToken();
    LOG('done..');

    return access_token
  }
  catch (error) {
    console.log("Error getting new token::>", error.output);
  }
}

async function NewGetToken()
{ // should return valid token
  // everything being used is the access token which is an object containing the actual token and other things
  LOG('getting valid token');

  if ( !access_token || access_token.expired()) { // if the access token is null - on first request or when the token has expired. this methods eliminates the need for me to check that manually..
    access_token = await NewToken()
  }
  
  console.log('token::>', access_token.token.access_token);
  console.log('token expiry time::>', access_token.token.expires_at);

  return access_token
}


function GetRelevantKeys(body)
{
  const bod_query  = body.query
  const bod_type   = body.type     ? body.type   : "track"
  const bod_limit  = body.limit    ? body.limit  :  10
  const bod_offset = body.offset   ? body.offset :  0

  if (bod_query === "" ) {
    throw "EMPTY_QUERY"
  }
  else if (!bod_query) {
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
  * parsing is handled by "GetRelevantKeys"
  * 
  */ 
  LOG('quering spotify');

  const params = GetRelevantKeys(body)

  const alt_quer = new SearchParams(params);
  const req_query = alt_quer.toString();

  console.log('request query::', req_query);

  var url = 'https://api.spotify.com/v1/search?' + req_query;

  const access_token = await NewGetToken(); // returns access token as opposed to the actuall token ; access token contains the actual token and other useful shit
  
  var options = {
    headers: TokenHeader(access_token),
    json: true
  };

  var result = await axios.get(url, options);

  console.log('spotify response::\n', result.data);
  LOG('done quering spotify');
  return result.data;
}

exports.search = search;