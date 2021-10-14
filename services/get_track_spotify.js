const axios = require('axios');
const LOG = require('../utils/logger')
const { GetTokenHeader } = require('./auth_spotify')


function GetId(body)
{// Parses body and extracts track id
  const bod_id  = String(body.id)

  if (!bod_id) {
    throw "EMPTY_QUERY"
  }
	return bod_id
}

async function GetTrack(body)
{/*
  * Sends request to spotify to get track specified by id
  * 
  * 
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

    if (error.response.data) {
      throw error.response.data
    }
    throw "SPOTIFY_ERROR"
  }
}

exports.GetTrack = GetTrack