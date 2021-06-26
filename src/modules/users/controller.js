

const GET = (req, res) => {
	let users = require('../../database/users.json')
	res.json( users )
}

module.exports = { GET }

