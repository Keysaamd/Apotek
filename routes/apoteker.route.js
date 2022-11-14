// memanggil si express
const express = require(`express`)

// membuat object `app`
const app = express()

// meminta izin untuk membaca data yang dikirimkan melalui form
app.use(express.urlencoded({extended:true}))

// load authorizaction dari middleware
const authorization =
require(`../middleware/authorization`)

// memanggil controller apoteker
const apotekerController = require(`../controllers/apoteker.controller`)

// defind row untuk akses data apoteker
app.get(`/`, authorization.cekUser, apotekerController.showDataApoteker)

// defind row untuk menampilkan form apoteker
app.get(`/add`, authorization.cekUser, apotekerController.showTambahApoteker) 

// defind routes untuk memproses tambah data apoteker
app.post(`/add`, authorization.cekUser, apotekerController.prosesTambahData)

// defind routes untuk menampilkan form apoteker dengan data yang akan diubah
app.get(`/edit/:id`, authorization.cekUser, apotekerController.showEditApoteker)

// defind route untuk memproses perubahan data
app.post(`/edit/:id`, authorization.cekUser, apotekerController.prosesUbahData)

// defind route untuk menghapus data
app.get(`/delete/:id`, authorization.cekUser, apotekerController.prosesHapusData)

// export object app
module.exports = app