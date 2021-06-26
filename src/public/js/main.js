let form = document.querySelector('#form')
let link = document.querySelector('#link')
let usersList = document.querySelector('.customers-list')
let id = window.localStorage.getItem('id')
let token = window.localStorage.getItem('token')

async function request (path, method, body) {
	let response = await fetch(path, {
		method,
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	})
	return await response.json()
}

if(token){
	btn.onclick = () =>{
			link.setAttribute('href', '/api/upload')
		}
}else{
	link.setAttribute('href', '/api/kabinet')
}




async function usersRenderer () {
	let users = await request('/api/users', 'GET')
	users.map( user => {

		let userItem = document.createElement('li')
		let username = document.createElement('span')
		let userId = document.createElement('span')

		
		userItem.classList.add('customer-item')
		username.classList.add('customer-name')
		
		username.textContent = user.username
		
		userItem.appendChild(username)
		imgRenderer (user.user_id)
		userItem.appendChild(userId)
		usersList.appendChild(userItem)

		async function imgRenderer (userID) {
			let images = await request('/api/image', 'GET')
			for( let img of images) {
				if(userID == img.user_id){
					let element = document.createElement('img')
					element.setAttribute('class', 'imgs')
					element.src = '/' + img.file_link
					userItem.append(element)	
				}
		
			}
		}
		
		userItem.onclick = () => {
			fetchFiles(user.user_id)
		}
	})
}

usersRenderer ()


async function fetchFiles (userId) {
	filesWrapper.innerHTML = null
	let files = await request('/api/files?user_id=' + userId, 'GET')
	files.map(async file => {
		let dev = document.createElement('div')
		let element = document.createElement('video')
		let IMG = document.createElement('img')
		let a = document.createElement('a')
		let p = document.createElement('p')

		a.setAttribute('href', '/api/download/' + file.file_link)
		a.setAttribute('class', 'down' )
		// a.textContent = 'download'
		element.setAttribute('class', 'el')
		dev.setAttribute('class', 'video-wrap')
		IMG.setAttribute('class', 'img-wrap')
		p.setAttribute('class', 'text')

		IMG.src ='/img' + '/down.png'

		p.textContent = file.file_link
		element.src = '/' + file.file_link
		element.controls = true
		element.width = 380
		element.height = 250
		a.append(IMG)
		dev.append(a)
		dev.append(p)
		dev.append(element)
		filesWrapper.append(dev)
	})
}


