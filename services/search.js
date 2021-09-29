var axios = require('axios');

var token, expiry_time;
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
var SearchParams = require('url').URLSearchParams;;
const LOG = require('../utils/logger')

const axios_options = {
  method: 'POST',
  url: 'https://accounts.spotify.com/api/token',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  data: 'grant_type=client_credentials',
  auth: {
    username: client_id,
    password: client_secret,
  }
};

const TokenHeader = (token) => ({ 'Authorization': 'Bearer ' + token });

async function GetToken() {
  LOG('getting valid token');
  if (!CheckIfTokenValid(token)) {
    const new_token = await RenewToken();

    token = new_token.token;
    expiry_time = new_token.expiry_time;
  }
  console.log('token::', token);
  console.log('token expiry time::', expiry_time);

  LOG('got valid token');
  return token;
}

async function RenewToken() {
  try {
    LOG('renewing token');
    const response = await axios.request(axios_options);

    const token = response.data.access_token; // set token
    const expires_in = response.data.expires_in;
    const expiry_time = GetCurrentTime() + expires_in; // set expiry time

    LOG('renewed token');
    return ({ token, expiry_time });
  }
  catch (e) {
    console.error("error renewing token:::", e.response.data);
  }
}

function CheckIfTokenValid(token) {
  if (!token || CheckIfExpired(token)) {
    // return false if token expired, null, undefined
    return false;
  }
  return true;
}

function CheckIfExpired(token) {
  // returns true if token is expired, false otherwise
  const current_time = GetCurrentTime();
  return expiry_time < current_time;
}

function GetCurrentTime() {
  const time_milli = new Date().getTime();
  const time_seconds = time_milli / 1000;

  return time_seconds;
}

async function search(body) {
  LOG('quering spotify');
  console.log('current time::', GetCurrentTime());
  // const quer =  qs.stringify(body)
  const alt_quer = new SearchParams(body);
  const req_query = alt_quer.toString();
  console.log('request query::', req_query);

  var url = 'https://api.spotify.com/v1/search?' + req_query;

  const token = await GetToken();
  // console.log( 'token' ,token)
  var options = {
    headers: TokenHeader(token),
    json: true
  };

  var result = await axios.get(url, options);

  console.log('spotify response::\n', result.data);
  LOG('done quering spotify');
  return result.data;
}
exports.search = search;
