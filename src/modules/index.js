const homeRouter = require('./home')
const uploadRouter = require('./upload')
const kabinetRouter = require('./kabinet')
const usersRouter = require('./users')
const uploadImgRouter = require('./uploadImg')

module.exports = [
	uploadRouter,
	homeRouter, 
	kabinetRouter,
	usersRouter,
	uploadImgRouter

]