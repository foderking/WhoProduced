const error_table = {
	"EmptySearchError": "You Have To Add A Valid Search Term",
	"RequestKeyError": "Request does not contain valid properties in query or body",
	"GeniusRequestError": "Error making communication with Genius api",
	"SpotifyRequestError": "Error making communication with spotify api",
	"CredentialError": "Unable to retrieve client Id or secret. Check .env file",
	"TokenError" : "Error retrieving token from api",
	"EmptyResultError" : "No result from api",
}


class EmptyQueryError extends Error {
  constructor() {
    super(error_table.EmptySearchError);
    this.name = "EmptySearchError"
  }
}

class RequestKeyError extends Error {
  constructor() {
    super(error_table.RequestKeyError);
    this.name = "RequestKeyError"
  }
}

class GeniusRequestError extends Error {
  constructor() {
    super(error_table.GeniusRequestError);
    this.name = "GeniusRequestError"
  }
}

class SpotifyRequestError extends Error {
  constructor() {
    super(error_table.SpotifyRequestError);
    this.name = "SpotifyRequestError"
  }
}

class CredentialError extends Error {
  constructor() {
    super(error_table.CredentialError);
    this.name = "CredentialError"
  }
}

class TokenError extends Error {
  constructor() {
    super(error_table.TokenError);
    this.name = "TokenError"
  }
}

class EmptyResultError extends Error {
  constructor() {
    super(error_table.EmptyResultError);
    this.name = "EmptyResultError"
  }
}


module.exports = {
	EmptyQueryError,
	RequestKeyError,
	GeniusRequestError,
	SpotifyRequestError,
	CredentialError,
	TokenError,
	EmptyResultError,
	error_table,
}