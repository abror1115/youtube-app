const router = require('express').Router()
const { GET, userGET } = require('./controller.js')
router.route('/')
	.get(GET, userGET)
	// .get(userGET)
	

module.exports = router