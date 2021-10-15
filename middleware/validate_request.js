const { RequestKeyError } = require("../services/custom_errors")

function validate (req, res, next) {
	const body = req.body
  // handles when request doesn't contain valid data
	if (!req.query) {
		if (!body || Object.keys(body).length === 0 ) {
			console.log('objecffft')
			throw new RequestKeyError()
		}
		else {
			next()
		}
	}
	next()
}

exports.ValidateReq = validate