// fuction untuk CRUD

// load dulu connection dari config
const connection = require(`../config`)

// fuction untuk mengambil data apoteker/petugas
exports.ambilDataApoteker = () => {
    return new Promise((resolve, reject) => {
        // membuat query untuk menganbil data
        let query =`select * from apoteker`

        // menjalankan querynya
        connection.query(query,(error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result)  
        })
    })
}

// fuction untuk mengambil data berdasarkan parameter khusus
exports.ambilDataDenganParameter = (parameter) => {
    return new Promise((resolve, reject) => {
        let params = Object
            .keys(parameter)
            .map(item => `${item}="${parameter[item]}"`)
            .join(` and `)

        let query = `select * from apoteker where ${params}`

        // menjalankan query-nya
        connection.query(query, (error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result)
        })
    })
}

// membuat funciton untuk menambah data apoteker baru
exports.tambahApoteker = (apoteker) => {
    return new Promise((resolve, reject) => {
        // mengambil key dari object apoteker
        let key = Object
            .keys(apoteker) //[key1, key2, dst]
            .join() //"key1, key2, dst"

        // mengambil value dari apoteker
        let value = Object
            .keys(apoteker) //[key1, key2, dst]
            .map(item => `"${apoteker[item]}"`) //[value1, value2, dst]
            .join() //"value1, value2, dst"

        let query = `insert into apoteker (${key}) values (${value})`

        // menjalankan query-nya
        connection.query(query, (error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result)
        })
    })
}

// membuat fungsi untuk update data apoteker
exports.ubahApoteker = (data, parameter) => {
    return new Promise((resolve, reject) => {
        // menyusun string untuk query bagian perulangan data
        let perubahanData = Object
            .keys(data) //[nama_customer, alamat]
            .map(item => `${item} ="${data[item]}"`)
            .join()

        // menyusun string untuk query bagian penentu data yang akan diubah
        let params = Object
            .keys(parameter)
            .map(item => `${item}="${parameter[item]}"`)
            .join(` and `)

        // menyusun query
        let query = `update apoteker set ${perubahanData} where ${params}`

        // menjalankan querynya 
        connection.query(query, (error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result)
        })
    })
}

// membuat fungsi untuk delete data apoteker
exports.hapusApoteker = (parameter) => {
    return new Promise((resolve, rejected) => {
        let params = Object
        .keys(parameter)
        .map(item => `${item} ="${parameter[item]}"`)
        .join(" and ")

        let query = `delete from apoteker where ${params}`

        connection.query(query,(error, result) => {
            if(error){
                rejected(error.message)
            }
            resolve(result)
        })
    })
}