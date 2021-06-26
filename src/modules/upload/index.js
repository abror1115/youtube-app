const router = require('express').Router()
const { POST, GET, GET_FILES, DOWNLOAD_FILES, DELETE } = require('./controller.js')

router.route('/api/upload')
	.post( POST )
	.get( GET )
	.delete( DELETE )

router.route('/api/files')
	.get( GET_FILES )

router.route('/api/download/:fileName')
	.get( DOWNLOAD_FILES )

module.exports = router