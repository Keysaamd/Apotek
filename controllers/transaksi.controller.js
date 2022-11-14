/** memanggil model obat */
const obatModel = require(`../models/obat.model`)

/** memanggil model customer */
const customerModel = require(`../models/customer.model`)
const { request, response } = require("express")

// memanggil model Transaksi
const transaksiModel = require(`../models/transaksi.model`)

// memanggil model detail_transaksi
const detailModel = require(`../models/detail_transaksi.model`)

/** function utk menampilkan form transaksi */
exports.showFormTransaksi = async (request, response) => {
    try {
        /** ambil data obat */
        let obat = await obatModel.findAll()
        /** ambil data customer */
        let customer = await customerModel.ambilDataCustomer()

        /** prepare data yg akan dipassing ke view */
        let sendData = {
            dataObat: obat, // array object
            dataCustomer: customer,
            page: `form-transaksi`,
            no_faktur: ``,
            tgl_transaksi: ``,
            dataObatString: JSON.stringify(obat), // string
            // JavaScriptObjectNotation = JSON 
            dataUser: request.session.dataUser,
            cart: request.session.cart
        }
        return response.render(`../views/index`, sendData)
    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// membuat fungsi untuk menambahkan obat ke keranjang
exports.addToCart = async (request, response) => {
    try {
        // dapetin data obat berdasarkan id_obat yang dikirimkan
        let selectedObat = await obatModel.findByCriteria({
            id: request.body.id_obat
        })

        // menampung/recive data yang dikirimkan
        let storData = {
            id_obat: request.body.id_obat,
            nama_obat: selectedObat[0].nama_obat,
            jumlah_beli: request.body.jumlah_beli,
            harga_beli: request.body.harga_beli
        }

        // memasukan data ke keranjang menggunakan session
        request.session.cart.push(storData)
        // push() -> menambah data kedalam array

        // direct ke halaman form-transaksi
        return response.redirect(`/transaksi/add`)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// membuat function untuk menghapus data item pada cart atau keranjang
exports.hapusCart = async (request, response) => {
    try {
        // mengambil seluruh data cart pada session
        let cart = request.session.cart

        // mengambil id_obat yang akan dihapus dari cart
        let id_obat = request.params.id

        // cari tahu posisi index dari data yang akan dihapus
        let index = cart.findIndex(item => item.id_obat == id_obat)

        // menghapus data sesuai index yang telah ditentukan
        cart.splice(index, 1)
        // splice digunakan untuk menghapus data pada array

        // kembalikan data cart ke dalam session
        request.session.cart = cart

        // direct ke halaman form-transaksi
        return response.redirect(`/transaksi/add`)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// membuat function untuk menyimpan data transaksi
exports.simpanTransaksi = async (request, response) => {
    try {
        // menampung data yang dikirimkan
        let newTransaksi = {
            no_faktur: request.body.no_faktur,
            tgl_transaksi: request.body.tgl_transaksi,
            id_customer: request.body.id_customer,
            id_apoteker: request.session.dataUser.id
        }

        // simpan transaksi
        let resultTransaksi = await transaksiModel.add(newTransaksi)

        // menampung isi cart
        let cart = request.session.cart

        for (let i = 0; i < cart.length; i++) {
            // menghapus dulu key nama_obat dari cart
            delete cart[i].nama_obat

            // menambahkan key id_transaksi ke dalam cart
            cart[i].id_transaksi = resultTransaksi.insertId

            // eksekusi simpan cart ke detail_transaksi
            await detailModel.add(cart[i])
        }

        // hapus cartnya
        request.session.cart =[]

        return response.redirect(`/transaksi/add`)
    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// membuat fungsi untuk menampilkan data transaksi
exports.showTransaksi = async (request, response) => {
    try {
        // mengambil data transaksi
        let transaksi = await transaksiModel.findAll()

        // menyisipkan data detail dari setiap transaksi
        
        for (let i = 0; i < transaksi.length; i++) {
            // mengambil id transaksi
            let id = transaksi[i].id

            // mengambil data detail nya sesuai id
            let detail = await detailModel.findByCriteria({id_transaksi: id})

            // menyisipkan detail ke transaksinya
            transaksi[i].detail = detail
        }
        console.log(transaksi);
        // prepare data yang dikirim ke view
        let sendData = {
            page: `transaksi`,
            dataUser: request.session.dataUser,
            transaksi: transaksi
        }

        return response.render(`../views/index`, sendData)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}