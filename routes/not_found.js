
function app (req, res) {
	res.status(404).json({
		"error" : "You just made a request to an invalid path"
	})
}

module.exports = app