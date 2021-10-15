
function Errors (error, req, res, next)
{
	if (error.name && error.message ) {
		res.json({
			error: {
				name: error.name,
				message: error.message
			}
		})
		return next()
	}

	if (error.error) {
		res.json({
			name: "REQUEST_ERROR",
			message: error.error.message,
			Error: true
		})
		return next()
	}


	res.json({
		name:"GENERIC_ERROR",
		message: "Error making request. try again.",
		Error: true
	})

	next()
}

exports.Errors = Errors