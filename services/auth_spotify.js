require('dotenv').config() // This needs to be called first in order for gettoken to work
const { ClientCredentials } = require('simple-oauth2')
const LOG = require('../utils/logger');
const { CredentialError, TokenError } = require('./custom_errors');

const spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;


if (!spotify_client_id || !spotify_client_secret) {
	throw new CredentialError()
}

const auth_config = {
	client: {
		id: spotify_client_id,
		secret:  spotify_client_secret,
	},
	auth: {
		tokenHost: 'https://accounts.spotify.com',
		tokenPath: '/api/token'
	}
}
let access_token = null;
const client = new ClientCredentials(auth_config); // we are using client credentials authorisation


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
		console.log("Error::>", error.output);
		throw new TokenError()
	}
}

async function GetToken()
{ // should return valid token
	// everything being used is the access token which is an object containing the actual token and other things
	LOG('getting valid token');

	if ( !access_token || access_token.expired()) { // if the access token is null - on first request or when the token has expired. this methods eliminates the need for me to check that manually..
		access_token = await NewToken()

		if (!access_token) throw new TokenError()
	}
	
	console.log('token::>', access_token.token.access_token);
	console.log('token expiry time::>', access_token.token.expires_at);

	return access_token
}

async function GetTokenHeader()
{
  const acc_token = await GetToken(); // returns access token as opposed to the actuall token ; access token contains the actual token and other useful shit
	const token_header = TokenHeader(acc_token)
	return token_header
}

exports.GetTokenHeader = GetTokenHeader