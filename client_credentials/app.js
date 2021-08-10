/**
 * This is an example of a basic node.js script that performs
 * the Client Credentials oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
 */

var request = require('request'); // "Request" library
var token
var client_id = '0b915b1dc5364b3293451d5f0d0e96d3'
var client_secret = '3940b98a1e9f44f5bc6e4d394664bd06'

var express = require('express'); // Express web server framework
var cors = require('cors');
var axios = require('axios');
const { response } = require('express');
// your application requests authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',

  headers: {
    'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
  },

  form: {
    grant_type: 'client_credentials'
  },

  json: true
};

function getHeader(token)
{
  return ({
      'Authorization': 'Bearer ' + token
   })
}

function testAccess()
{
  var options = {
    url: 'https://api.spotify.com/v1/users/jmperezperez',

    headers: getHeader(token),

    json: true
    // headers: {
    //   'Authorization': 'Bearer ' + token
    // },
  };

  request.get(options, function(error, response, body) {
    if (!error && response.statusCode === 200) {
    console.log('success',body);
    }
    else{
      console.log('error',error, body)
    }
  });


}

function login()
{
  console.log('logging in')

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log('expires',body.expires_in)
      // use the access token to access the Spotify Web API
      token = body.access_token;
      console.log('token', token)
    }
    else {
      console.log(error)
    }
  });
}

async function search(body)
{
  // const quer = 'q=' + querEscape(query) + '&type=track' + '&limit=7' 
  const quer = 'q=' + querEscape(body.query) + '&type=' + body.type + '&limit=' + body.limit
  console.log(quer)
  var url = 'https://api.spotify.com/v1/search?' + quer
  var options = {
    headers: getHeader(token ),
    json: true
  }

  var ans = await axios.get(url, options)

  // var ans = request.get(options, function(error, response, body) {
  //   if (!error && response.statusCode === 200) {
  //   console.log('success',body);
  //   return  response
  //   }
  //   else{
  //     console.log('error',error, body)
  //   }
  // });


  console.log(ans.data)
  return ans.data
}


function querEscape(string)
{
  return string.trim().replace(/\s+/g, '+')
}


var app = express();


app
  .use(express.json())
  .use(express.static(__dirname + '/public'))
  .use(cors())





app.post('/search', async function(req, res) {
  const body = req.body

  if (!body ||Object.keys(body).length === 0 )
  {
    console.log('empty object')
    return res.status(404).send('No body')
  }
  console.log('req body', body)
  // testAccess()
  try {
    var ans  = await search(body) 
    res.send(ans)
  } catch (error) {
    console.log('renewing token')
    login()
    if (error.response.status === '401'){
      search(body) 
        .then(data => res.send(data))
      // res.send(ans)
    }
    else{
      console.log(error.response)
      console.log(error.config.url, 'status')
      console.log('error\n',error)
      res.status(400)
    }
  }
})



console.log('Listening on 8888');
login()
app.listen(8888);