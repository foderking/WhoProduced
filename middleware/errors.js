
// throw new Error('hahaha')


// const err = error.response.data ? error.response.data : error
// console.log('Error:::>', err)
// res.status(400).json(err)

function Errors (error, req, res, next) {
	console.log('Error::>', error.error)

	if (error.error) {
		res.json({
			name: "SPOTIFY_ERROR",
			message: error.error.message,
			Error: true
		})
		return next()
	}
	
	switch (error) {
		case "EMPTY_BODY_ERROR":
			res.json({
				name: error,
				message:'No Body Present In Request',
				Error: true
			})
			break;
		case "EMPTY_QUERY":
			res.json({
				name: error, 
				message: "You Have To Add A Valid Search Term",
				Error: true
			})
			break;
		case "REQUEST_KEY_ERROR":
			res.json({
				name: error,
				message: "Request body doesn't contain valid key types.\nbody.query && body.type => string, body.limit && body.offset => number.",
				Error: true
			})
			break;
		case 'EMPTY_SPOTIFY_RESPONSE':
			res.json({
				name: error,
				message: "No Result From Spotify",
				Error: true
			})
			break;

		default:
			res.json({
				name:"GENERIC_ERROR",
				message: "Error making request. try again.",
				Error: true
			})
			break;
	}

	next()
}

exports.Errors = Errors