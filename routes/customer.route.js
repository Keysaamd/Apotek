// memanggil si express
const express = require(`express`)

// membuat object `app`
const app = express()

// meminta izin untuk membaca data yang dikirimkan melalui form
app.use(express.urlencoded({extended:true}))

// load authorizaction dari middleware
const authorization =
require(`../middleware/authorization`)

// memanggil controller customer
const customerController = require(`../controllers/customer.controller`)

// defind row untuk akses data customer
app.get(`/`, authorization.cekUser, customerController.showDataCustomer)

// defind row untuk menampilkan form customer
app.get(`/add`, authorization.cekUser, customerController.showTambahCustomer) 

// defind routes untuk memproses tambah data customer
app.post(`/add`, authorization.cekUser, customerController.prosesTambahData)

// defind routes untuk menampilkan form customer dengan data yang akan diubah
app.get(`/edit/:id`, authorization.cekUser, customerController.showEditCustomer)

// defind route untuk memproses perubahan data
app.post(`/edit/:id`, authorization.cekUser, customerController.prosesUbahData)

// defind route untuk menghapus data
app.get(`/delete/:id`, authorization.cekUser, customerController.prosesHapusData)

// export object app
module.exports = app
