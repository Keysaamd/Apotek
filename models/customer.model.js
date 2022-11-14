// fuction untuk CRUD 

// load dulu connection dari config
const connection = require(`../config`)

// fuction untuk mengambil data customer
exports.ambilDataCustomer = () => {
    return new Promise((resolve, reject) => {
        // membuat query untuk mengambil data
        let query = `select * from customer`

        // menjalankan query-nya
        connection.query(query, (error, result) => {
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

        let query = `select * from customer where ${params}`

        // menjalankan query-nya
        connection.query(query, (error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result)
        })
    })
}

// membuat funciton untuk menambah data customer baru
exports.tambahCustomer = (customer) => {
    return new Promise((resolve, reject) => {
        // mengambil key dari object customer
        let key = Object
            .keys(customer) //[key1, key2, dst]
            .join() //"key1, key2, dst"

        // mengambil value dari customer
        let value = Object
            .keys(customer) //[key1, key2, dst]
            .map(item => `"${customer[item]}"`) //[value1, value2, dst]
            .join() //"value1, value2, dst"

        let query = `insert into customer (${key}) values (${value})`

        // menjalankan query-nya
        connection.query(query, (error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result)
        })
    })
}

// membuat fungsi untuk update data customer
exports.ubahCustomer = (data, parameter) => {
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
        let query = `update customer set ${perubahanData} where ${params}`

        // menjalankan querynya 
        connection.query(query, (error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result)
        })
    })
}

// membuat fungsi untuk delete data customer
exports.hapusCustomer = (parameter) => {
    return new Promise((resolve, rejected) => {
        let params = Object
        .keys(parameter)
        .map(item => `${item} ="${parameter[item]}"`)
        .join(" and ")

        let query = `delete from customer where ${params}`

        connection.query(query,(error, result) => {
            if(error){
                rejected(error.message)
            }
            resolve(result)
        })
    })
}