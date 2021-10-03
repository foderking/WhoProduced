function validate (req, res, next) {
	const body = req.body
  // handles when request doesn't contain valid data
  if (!body || Object.keys(body).length === 0 ) {
		next("EMPTY_BODY_ERROR")
  }
	else {
		next()
	}
}

exports.ValidateReq = validate