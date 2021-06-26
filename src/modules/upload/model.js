const { mhid } = require('../../lib/mhid.js')
const  fs = require('fs')
const  path = require('path')


const uploadFile = (file, userId) => {
	let fileName = mhid(10) + file.name.replace(/\s/g, "")
	file.mv(path.join(process.cwd(), 'src', 'uploads', fileName), (err) => {
		if(err) throw error
		let array = fs.readFileSync(path.join(process.cwd(), 'src', 'database', 'files.json'), 'UTF-8')
		array = array ? JSON.parse(array) : []
		let id = array.length ? array[array.length - 1].file_id + 1 : 1
		let newFile = {
			file_id: id,
			file_link: fileName,
			user_id:+userId
		}
		array.push(newFile)
		fs.writeFileSync(path.join(process.cwd(), 'src', 'database', 'files.json'), JSON.stringify(array, null, 4))
	})
	return true
}

const getFiles = () => {
	let array = fs.readFileSync(path.join(process.cwd(), 'src', 'database', 'files.json'), 'UTF-8')
	array = array ? JSON.parse(array) : []
	return array
}

const remove = ( { id }) => {
    try{
        let files = fs.readFileSync(path.join(process.cwd(),  'src',  'database', 'files.json'), 'UTF-8')
        files = files ? JSON.parse(files) : []
        let filtered = files.filter( file => file.file_id !== id)
        fs.writeFileSync(path.join(process.cwd(), 'src', 'database', 'files.json'), JSON.stringify(filtered, null, 4))
        return filtered
    }catch(err){
      console.log(err);
    }
}

module.exports = { uploadFile, getFiles, remove }