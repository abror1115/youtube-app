const render = require('../../lib/render.js')

const GET = (req, res) => {
	res.sendFile( render('index.html') )
}
const userGET = (req, res) => {
	let users = require('../../database/users.json')
	res.sendFile( render('index.html') )
	res.json( users )
}

module.exports = { GET, userGET }