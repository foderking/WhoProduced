require('dotenv').config()

const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLIENT_SECRET

var express = require('express'); // Express web server framework
var cors = require('cors');
var axios = require('axios');
var qs = require('querystring')
// var jwt = require('jsonwebtoken');
var SearchParams = require('url').URLSearchParams


var token, expiry_time
var app = express();
app
  .use(express.json())
  .use(cors())
  // .use(express.static(__dirname + '/public'))



const axios_options = {
  method: 'POST',
  url: 'https://accounts.spotify.com/api/token',
  headers: {'content-type': 'application/x-www-form-urlencoded'},
  data: qs.stringify({
    grant_type: 'client_credentials',
  }),
  auth: {
    username: client_id,
    password: client_secret,
  }
}

const  TokenHeader = (token) =>  ({ 'Authorization': 'Bearer ' + token })
// function testAccess()
// {
//   const url = 'https://api.spotify.com/v1/users/jmperezperez'
//   var options = {
//     headers: getHeader(token ),
//     json: true
//   }
//   axios
//     .get(url, options)
//     .then(res => console.log('success', res.data))
//     .catch(err => console.log('error', err.response.data))
// }
const LOG = (message) => {
  console.log()
  console.log(message.toUpperCase())
  console.log('================================' )
  console.log()
}

// function SpotifyAuthenticate()
// {
//   LOG('Authenticating with Spotify')

//   axios.request(axios_options)
//     .then((response) => {
//       body = response.data
//       console.log("response body::", body)

//       token = body.access_token;
//       console.log('response token::', token)
//     })
//     .catch((error) => console.error('Error authenticating::\n'.toUpperCase(), error.response.data, '\n') )
// }


async function GetToken()
{ // returns valid token to use in request
  LOG('getting valid token')
  if  ( !CheckIfTokenValid(token) ) {
    const new_token = await RenewToken()

    token = new_token.token
    expiry_time = new_token.expiry_time
  }
  console.log('token::', token)
  console.log('token expiry time::', expiry_time)

  LOG('got valid token')
  return token
}

async function RenewToken()
{
  try {
    LOG('renewing token')
    const response = await axios.request(axios_options)

    const token = response.data.access_token // set token
    const expires_in =  response.data.expires_in
    const expiry_time = GetCurrentTime() + expires_in // set expiry time
    
    // console.log('token::', token)
    
    LOG('renewed token')
    return ({ token, expiry_time })
  }
  catch(e) {
    console.error("error renewing token:::", e.response.data)
  }
}

function CheckIfTokenValid(token)
{ // return true if the token if valid
  if (!token || CheckIfExpired(token) ) {
    // return false if token expired, null, undefined
    return false
  }
  return true
}

function CheckIfExpired(token) {
  // returns true if token is expired, false otherwise
  const current_time = GetCurrentTime()
  return expiry_time < current_time
}

function GetCurrentTime()
{ // returns the current time in seconds - No. of seconds from Jan, 1, 1970
  const time_milli = new Date().getTime()
  const time_seconds = time_milli / 1000

  return time_seconds
}

async function search(body)
{
  LOG('quering spotify')
  console.log('current time::', GetCurrentTime())
  // const quer =  qs.stringify(body)
  const alt_quer = new SearchParams(body)
  const req_query = alt_quer.toString()
  console.log('request query::', req_query )
  
  var url = 'https://api.spotify.com/v1/search?' + req_query

  const token = await GetToken()
  // console.log( 'token' ,token)
  
  var options = {
    headers: TokenHeader( token ),
    json: true
  }

  var result = await axios.get(url, options)

  console.log('spotify response::\n', result.data)
  LOG('done quering spotify')
  return result.data
}




app.get('/', (req, res) => {
  LOG('REQUEST TO /')
  res.send('hi')
})


app.post('/search', async function(req, res) {
  const body = req.body
  LOG('REQUEST TO /search')

  // handles when request doesn't contain valid data
  if (!body || Object.keys(body).length === 0 ) {
    console.log('empty object')
    return res.status(404).send({"error":'No body'})
  }

  console.log('req body', body)

  try {
    var ans  = await search(body) 
    res.send(ans)
  }
  catch (error) {
    console.log('error searching', error.response.data)
    res.status(400).json(error.response.data)
  }
})


app.listen(8888);

LOG('Listening on 8888');
// SpotifyAuthenticate()
