let id = window.localStorage.getItem('id')
let usersList = document.querySelector('.customers-list')
let image = document.querySelector('#image')
let token = window.localStorage.getItem('token')
if(!token) window.location='/api/kabinet'

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


form.onsubmit = async (event) => {
	event.preventDefault()
	let formData = new FormData()
	formData.append('file', file.files[0])
	formData.append('id', +id)
	
	await fetch('/api/upload', {
		method: 'POST',
		body: formData
	})	
	// body = null
	window.location = '/api/upload'
}



let userID = window.localStorage.getItem('id')
async function imgRenderer () {
	let images = await request('/api/image', 'GET')
	images.map( async img => {
		if(userID == img.user_id){
			let element = document.createElement('img')
			element.src = '/' + img.file_link
			image.append(element)	
		}

	})
}
imgRenderer ()


let userL = window.localStorage.getItem('username')
async function usersRenderer () {
	let users = await request('/api/users', 'GET')
	users.map( user => {
		if(userL == user.username){
			let userItem = document.createElement('li')
			let username = document.createElement('span')
			
			userItem.classList.add('customer-item')
			username.classList.add('customer-name')

			username.textContent = user.username
			userItem.appendChild(username)
			usersList.appendChild(userItem)
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
		let button = document.createElement('button')

		a.setAttribute('href', '/api/download/' + file.file_link)
		a.setAttribute('class', 'down' )
		element.setAttribute('class', 'el')
		dev.setAttribute('class', 'video-wrap')
		IMG.setAttribute('class', 'img-wrap')
		button.setAttribute('class', 'close-btn')
		IMG.src ='/img' + '/down.png'
		button.textContent = 'X'

		element.src = '/' + file.file_link
		element.controls = true
		element.width = 380
		element.height = 250
		a.append(IMG)
		dev.append(a)
		dev.append(button)
		dev.append(element)
		filesWrapper.append(dev)
		
		button.onclick = async () => {
			let res = await request('/api/upload', 'DELETE', { id: file.file_id})
            if(res){
                dev.remove()
            }
        }
	})
}

let idL = window.localStorage.getItem('id')

fetchFiles (idL)