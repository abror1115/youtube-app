const render = require('../../lib/render.js')
const authModel = require('./model')
const path = require('path')
const model = require('./model.js')
const fs = require('fs')
const { sign, verify } = require('../../lib/jwt.js')

  


const POST = ( (req, res) => {
	try {
		const { username, email, password, } = req.body
		let users = fs.readFileSync(path.join(process.cwd(), 'src', 'database', 'users.json'), 'utf8')
		users = users ? JSON.parse(users) : []
		let found = users.find( user => user.username == username)
		let newUser
		if(!found){
			let userId = users.length ? users[users.length - 1].user_id + 1 : 1
			 newUser = { 
				user_id: userId,
				username,
				password,
				email,
			}
		}else return
		users.push(newUser)
		fs.writeFileSync(path.join(process.cwd(),  'src', 'database', 'users.json'), JSON.stringify(users, null, 4))
		delete newUser.password
		res.status(201).json({ 
			message: "The user has been added!", 
			body: { userId: newUser.user_id, username: newUser.username }, 
			token: sign(newUser)
		})
	} catch (error) {
		res.status(400).json({ message: error.message,body:'Xato' })
	}
})


const GET = (req, res) => {
	res.sendFile( render('login.html') )
}

const LOGIN = (req, res) => {
	try {
		const { username, password } = req.body
		let users = fs.readFileSync(path.join(process.cwd(),  'src', 'database', 'users.json'), 'utf-8')
		users = users ? JSON.parse(users) : []
		let user = users.find( user => user.username == username && user.password == password)
		if(user) {
			delete user.password
			res.status(200).json({ 
				message: "The user has been logged in!", 
				body: { userId: user.user_id, username: user.username }, 
				token: sign(user)
			})
		} else throw 'Wrong username or password!'
	} catch (error) {
		res.status(400).json({ message: error })
	}
}

const REGISTER = (req, res) => {
    try{
        let buf = ''
        req.on('data', (data) => buf += data)
        req.on('end', () => {
            let newUser = authModel.insert( JSON.parse(buf.toString()))
            if(newUser){
                res.writeHead(201, {'Content-Type': 'application/json'})
                return res.end(JSON.stringify({message:'The data created', username:newUser.username,
                 userId: newUser.id,
                 token: sign(newUser)}))
            }else{
                res.writeHead(400, {'Content-Type': 'application/json'})
                return res.end(JSON.stringify({message:'Bunday username avval ro\'yxatdan o\'tgan ', username:null, userId: null,
                 token: null}))
            }
        })

    }catch(err){
        res.statusCode = 400
        return res.end('Xatolik yuz berdi')
    }
}


// const LOGIN = (req, res) => {
//     try{
//         let buf = ''
//         req.on('data', (data) => buf += data)
//         req.on('end', () => {
//             let user = authModel.login( JSON.parse(buf.toString()))
//             if(user){
//                 res.writeHead(201, {'Content-Type': 'application/json'})
//                 return res.end(JSON.stringify({message:'The user logged in', username:user.username,
//                 id: user.id,
//                 token: instance.crypt(user.username)}))
//             }else{
//                 res.writeHead(400, {'Content-Type': 'application/json'})
//                 return res.end(JSON.stringify({message:'Login yoki parol xato ', username:null, userId: null,
//                 token: null}))
//             }
//         })
        
//     }catch(err){
//         res.statusCode = 400
//         return res.end('Xatolik yuz berdi')
//     }
// }

module.exports = {GET, POST, LOGIN }

