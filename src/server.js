const fileUpload = require('express-fileupload')
const express = require('express')
const path = require('path')
const app = express()
const { host, PORT } = require('./config.js')

// middlewares
app.use( express.json() )
app.use( fileUpload() )
app.use( express.static(path.join(__dirname, 'uploads')) )
app.use( express.static(path.join(__dirname, 'uploadsImg')) )
app.use( express.static(path.join(__dirname, 'public')) )
const modules = require('./modules')
app.use(modules)


app.listen(PORT, () => console.log('Server is running on http://' + host + ':' + PORT))