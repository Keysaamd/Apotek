// memanggil express
const express = require(`express`)

// membuat object dari express
const app = express()

// izin membaca data dari request.body
app.use(express.urlencoded({extended: true}))

// memanggil controller transaksi
const transaksiController = require (`../controllers/transaksi.controller`)

// load authorizaction dari middleware
const authorization = require(`../middleware/authorization`)

// membuat route untuk menampilkan form transaksi
app.get(`/add`, authorization.cekUser, transaksiController.showFormTransaksi)

// route untuk menyimpan data transaksi
app.post(`/add`, authorization.cekUser, transaksiController.simpanTransaksi)

// route untuk menampilkan data transaksinya
app.get(`/`, authorization.cekUser, transaksiController.showTransaksi)

// export object app
module.exports = app