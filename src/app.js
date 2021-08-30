require('dotenv').config()
var token

const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLIENT_SECRET
console.log(client_secret)

var express = require('express'); // Express web server framework
var cors = require('cors');
var axios = require('axios');
const qs = require('querystring')





var app = express();

app
  .use(express.json())
  .use(express.static(__dirname + '/public'))
  .use(cors())







const axiosOptions = {
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

// helper function
const  getHeader = (token) =>  ({ 'Authorization': 'Bearer ' + token })

const  querEscape = (string) =>  string.trim().replace(/\s+/g, '+')


function testAccess()
{
  const url = 'https://api.spotify.com/v1/users/jmperezperez'
  var options = {
    headers: getHeader(token ),
    json: true
  }
  axios
    .get(url, options)
    .then(res => console.log('success', res.data))
    .catch(err => console.log('error', err.response.data))
}

function spotifyLogin()
{
  console.log('logging in')

  axios.request(axiosOptions)
    .then((response) => {
      body = response.data

      console.log(body)
      console.log('expires',body.expires_in)

      token = body.access_token;
      console.log('token', token)
    })
    .catch((error) => console.error('error logging in\n',error.response.data) )
}

async function search(body)
{
  const quer =  qs.stringify({...body, query: querEscape(body.query)})
  console.log(quer)
  
  var url = 'https://api.spotify.com/v1/search?' + quer
  
  var options = {
    headers: getHeader(token ),
    json: true
  }

  var result = await axios.get(url, options)

  console.log(result.data)
  return result.data
}







app.post('/search', async function(req, res) {
  const body = req.body

  if (!body || Object.keys(body).length === 0 ) {
    console.log('empty object')
    return res.status(404).send({"error":'No body'})
  }
  console.log('\nreq body', body)

  try {
    var ans  = await search(body) 
    res.send(ans)
  }
  catch (error) {
    console.log('renewing token')
    spotifyLogin()

    if (error.response.status === 401){
      console.log('try searching again')

      search(body) 
        .then(data => res.send(data))
    }
    else{
      console.log('error searching', error.response.data)
      res.status(400).json(error.response.data)
    }
  }
})


app.listen(8888);

console.log('Listening on 8888');
spotifyLogin()