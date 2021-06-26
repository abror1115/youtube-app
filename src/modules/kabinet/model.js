const fs = require('fs') 
const path = require('path')


const insert = (user) => {
    try{
        const { username, email, password } = user
        let data = fs.readFileSync(path.join(process.cwd(), 'src', 'database', 'users.json'), 'UTF-8')
        let newUser
        if(!data){
            data = []
            newUser = {user_id: 1, username, email, password}
        }else {
            data = JSON.parse(data)
            let found = data.find( user => user.username == username)
            if(!found){
                let id = data.length ? data[data.length - 1].id + 1 : 1
                newUser = { user_id: id, username, email, password}
            } else return
        }
        data.push(newUser)
        fs.writeFileSync(path.join(process.cwd(), 'src', 'database', 'users.json'),JSON.stringify(data, null, 4))
        return newUser
    }catch(err){
        return err
    }
}

const login = (user) => {
    try{
        const {username, password,} = user
        let data = fs.readFileSync(path.join(process.cwd(), 'src', 'database', 'users.json'), 'UTF-8')
        if(!data) return
        else{
            data = JSON.parse(data)
            let found = data.find( user => user.username == username && user.password == password)
            if(found){
                return found
            }else return
        }
    }catch(error){
        throw error
    }
}

module.exports = {
    insert,
    login
}