const router = require('express').Router()
const { GET } = require('./controller.js')


router.route('/api/users')
	.get( GET )


module.exports = router