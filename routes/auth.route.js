// memanggil si express
const express = require(`express`)

// membuat objevt untuk express
const app = express()

// meminta izin untuk membaca request pada user
app.use(express.urlencoded({extended: true}))

// memanggil controller auth
const authController = require(`../controllers/auth.controller`)

//  membuat route untuk menampilkan halaman login
app.get(`/`, authController.showLogin)

// membuat rout untuk proses login 
app.post(`/`,authController.authentication)

// membuat route untuk proses logout
app.get(`/logout`, authController.logout)

// export object app
module.exports = app