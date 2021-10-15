const axios = require('axios');
const LOG = require('../utils/logger')
const { GetTokenHeader } = require('./auth_spotify');
const { SpotifyRequestError, RequestKeyError } = require('./custom_errors');


function GetId(body)
{// Parses body and extracts track id
  const body_id  = String(body.id)

  if (!body_id) {
    throw new RequestKeyError()
  }
	return body_id
}

async function GetTrack(body)
{/*
  * Sends request to spotify to get track specified by id
  */ 
    LOG('getting track from spotify');

    const id = GetId(body)

    const url = 'https://api.spotify.com/v1/tracks/' + id;

    console.log('Request query::>', url);

    const token_header = await GetTokenHeader()

    const options = {
      headers: token_header,
      json: true
    };

  try {
    const result = await axios.get(url, options);
    console.log('Spotify response::>', result.status);

    LOG('done getting track from spotify');
    return result.data;   
  }
  catch (error) {
    LOG('error quering spotify');
    console.log("Error::>", error.response.data)
    // error.response.data => {
    //   meta: {
    //     status: 401,
    //     message: 'This call requires an access_token. Please see: https://genius.com/developers'
    //   }
    // }
    // throw "SPOTIFY_ERROR"
    throw new SpotifyRequestError()
  }
}

exports.GetTrack = GetTrack