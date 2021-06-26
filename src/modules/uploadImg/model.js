const { mhid } = require('../../lib/mhid.js')
const  fs = require('fs')
const  path = require('path')

const uploadFile = (file, userId) => {
	let fileName = mhid(10) + file.name.replace(/\s/g, "")
	file.mv(path.join(process.cwd(), 'src', 'uploadsImg', fileName), (err) => {
		if(err) throw error
		let array = fs.readFileSync(path.join(process.cwd(), 'src', 'database', 'image.json'), 'UTF-8')
		array = array ? JSON.parse(array) : []
		let id = array.length ? array[array.length - 1].file_id + 1 : 1
		let newFile = {
			file_id: id,
			file_link: fileName,
			user_id:+userId
		}
		array.push(newFile)
		fs.writeFileSync(path.join(process.cwd(), 'src', 'database', 'image.json'), JSON.stringify(array, null, 4))
	})
	return true
}

const getFiles = () => {
	let array = fs.readFileSync(path.join(process.cwd(), 'src', 'database', 'image.json'), 'UTF-8')
	array = array ? JSON.parse(array) : []
	return array
}

module.exports = { uploadFile, getFiles }