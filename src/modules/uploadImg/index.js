const router = require('express').Router()
const { POST, GET, GET_FILES, DOWNLOAD_FILES } = require('./controller.js')

router.route('/api/uploadImg')
	.post( POST )
	.get( GET )

router.route('/api/image')
	.get( GET_FILES )

router.route('/api/download/:fileName')
	.get( DOWNLOAD_FILES )

module.exports = router