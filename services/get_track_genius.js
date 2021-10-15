const axios = require('axios');
const LOG = require('../utils/logger')
const { GetTokenHeader } = require('./auth_genius');
const { RequestKeyError, GeniusRequestError } = require('./custom_errors');

function ValidateId(id) {
  if (!id || !Number(id)) {
    throw new RequestKeyError()
  }
}

async function GetTrack(id)
{/*
  * Sends request to genius to get track specified by id
  */ 
  LOG('getting track from genius');

  ValidateId(id)

  const url = 'https://api.genius.com/songs/' + id + '?text_format=plain';

  console.log('Request query::>', url);

  const token_header = await GetTokenHeader()

  const options = {
    headers: token_header,
    json: true
  };

  try {
    const result = await axios.get(url, options);
    console.log('Genius response::>', result.status);

    LOG('done getting track from genius');
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
    // throw "GENIUS_ERROR"
    throw new GeniusRequestError()
  }
}

exports.GetTrackGenius = GetTrack