const router = require('express').Router()
const { GET, POST, LOGIN } = require('./controller.js')

router.route('/api/kabinet')
	.post( POST )
	.get( GET )

router.route('/api/login')
	.post( LOGIN )
	// .get( GET )


// router.route('/api/download/:fileName')
// 	.get( DOWNLOAD_FILES )

module.exports = router