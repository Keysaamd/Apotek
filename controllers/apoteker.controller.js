// memanggil model apoteker
const { request, response } = require("express")
const apotekerModel = require(`../models/apoteker.model`)
// request -> melihat data apoteker
// response => menampilkan data apoteker melalui view

// memanggile file crypt.js
const crypt = require(`../crypt`)

exports.showDataApoteker = async (request, response) => {
    try {
        // mengambil data apoteker menggunakan model
        let dataApoteker = await apotekerModel.ambilDataApoteker()
        // passing ke view
        let sendData = {
            page: `apoteker`,
            data: dataApoteker,
            dataUser: request.session.dataUser
        }
        return response.render(`../views/index`, sendData)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// fungsi untuk menampilkan form-apoteker untuk menambah data
exports.showTambahApoteker = async (request, response) => {
    try {
        // prepare data yang akan dipassing ke view
        let sendData = {
            nama_apoteker: ``,
            username: ``,
            password: ``,
            page: `form-apoteker`,
            targetRoute: `/petugas/add`,
            deskripsi: crypt.deskripsi,
            dataUser: request.session.dataUser
        }
        return response.render(`../views/index`, sendData)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// fungsi untuk memproses data apoteker baru
exports.prosesTambahData = async (request, response) => {
    try {
        // membaca data dari yang diisikan user
        let newData = {
            nama_apoteker: request.body.nama_apoteker,
            username: request.body.username,
            password: crypt.enkripsi(request.body.password)
        }
        // eksekusi tambah data
        await apotekerModel.tambahApoteker(newData)

        // redirect ke tampilan data petugas
        return response.redirect(`/petugas`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// fungsi untuk menampilkan data petugas yang akan diubah
exports.showEditApoteker = async (request, response) => {
    try {
        // mendapatkan id dari apoteker yang akan diubah
        let id = request.params.id

        // menampung id kedalam object
        let parameter = {
            id: id
        }

        // mengambil data sesuai parameter
        let apoteker = await apotekerModel.ambilDataDenganParameter(parameter)

        // prepare data yang akan ditampilkan oada view
        let sendData = {
            nama_apoteker: apoteker[0].nama_apoteker,
            username: apoteker[0].username,
            password: apoteker[0].password,
            page: `form-apoteker`,
            targetRoute: `/petugas/edit/${id}`,
            deskripsi: crypt.deskripsi,
            dataUser: request.session.dataUser
        }

        return response.render(`../views/index`, sendData)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// fungsi untuk memproses data yang diedit
exports.prosesUbahData = async (request, response) => {
    try {
        // mendapatkan id yang diubah
        let id = request.params.id

        // membbungkus id ke bentuk object
        let parameter = {
            id: id
        }

        // menampung perubahan data ke dalam object
        let perubahan = {
            nama_apoteker: request.body.nama_apoteker,
            username: request.body.username,
            password: crypt.enkripsi(request.body.password)
        }
        // eksekusi perubahan data
        await apotekerModel.ubahApoteker(perubahan, parameter)

        // direct ke tampilan data apoteker
        return response.redirect(`/petugas`)
        // return response.json({message: true})

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// fungsi untuk menghapus data
exports.prosesHapusData = async (request, response) => {
    try {
        let id = request.params.id
        let parameter = {
            id: id
        }
        await apotekerModel.hapusApoteker(parameter)
        return response.redirect(`/petugas`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}
