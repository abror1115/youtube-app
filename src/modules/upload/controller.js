const render = require('../../lib/render.js')
const path = require('path')
const model = require('./model.js')

const POST = (req, res) => {
	const { file } = req.files
	const y =  req.body
	if(file) {
		let response = model.uploadFile(file, y.id)
		if(response) {
			res.redirect('/api/upload')
		} else res.status(404).json({ message: 'There is an error!' })
	} else {
		res.status(404).json({ message: 'The file is not found!' })
	}
}

const GET = (req, res) => {
	res.sendFile( render('uploads.html') )
}

const GET_FILES = (req, res) => {
	const { user_id } = req.query
	
	let files = model.getFiles()
	// res.json(files)
	if(user_id) {
		return res.json(files.filter(file => file.user_id == user_id))
	} else {
		return res.json( files )	
	}
}

const DOWNLOAD_FILES = (req, res) => {
	res.download(path.join(process.cwd(), 'src', 'uploads', req.params.fileName))
}

const DELETE = (req, res) => {
    let response = model.remove(req.body)
    if(response) {
        res.status(201).json({message: "The todo has been deleted!"})
    }else{ 
        res.status(400).json({message:'Something went wrong!'})
    }

}


module.exports = { POST, GET, GET_FILES, DOWNLOAD_FILES, DELETE }

