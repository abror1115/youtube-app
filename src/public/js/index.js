let regF = document.querySelector('.regForm')
let login = document.querySelector('#login')
let logForm = document.querySelector('.logForm')
let regForm = document.querySelector('#regForm')
let username = document.querySelector('#username')
let password = document.querySelector('#password')
let err = document.querySelector('#err')


async function  request (path, method, body )  {
    let response = await fetch(path, {
        method,
        headers:{ 'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    })
    let parsedResponse = await response.json()
    return parsedResponse
}

login.onclick = () => {
	regF.classList.add('active')
	logForm.classList.add('active')
}

reg.onclick = () => {
	regF.classList.remove('active')
	logForm.classList.remove('active')
}
// if(token) window.location = '/'



regForm.onsubmit = async (event) => {
    event.preventDefault()
    let newUser = {
        username: username.value,
        password: password.value,
        email: email.value
    }

    let respons = await request('/api/kabinet', 'POST', newUser)
    if(respons.body.username){
        window.localStorage.setItem('token', respons.token)
        window.localStorage.setItem('username', respons.body.username)
        window.localStorage.setItem('id', respons.body.userId)
        window.location = '/'
    }else{
        alert( 'Username avval ro\'yxatdan o\'tgan')
    }
    let idUser = window.localStorage.getItem('id')
    let formData = new FormData()
	formData.append('file', file.files[0])
	formData.append('id', +idUser)

	await fetch('/api/uploadImg', {
		method: 'POST',
		body: formData
	})
}


let token = window.localStorage.getItem('token');
if(token) window.location = '/api/upload'

logForm.onsubmit = async (event) => {
    event.preventDefault()

    let newUser = {
        username: lusername.value,
        password: lpassword.value
    }

    let response = await request('/api/login', 'POST', newUser)
    if(response.body.username){
        window.localStorage.setItem('token', response.token)
        window.localStorage.setItem('username', response.body.username)
        window.localStorage.setItem('id', response.body.userId)
        window.location = '/api/upload'
    }else{
        lerr.textContent = 'Login yoki parol xato'
    }
}