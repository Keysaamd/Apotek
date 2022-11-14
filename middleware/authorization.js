// fungsi authorization
exports.cekUser = (request, response, next) => {
    // fungsi ini digunakan untuk mengeecek data yang user yang tersimpan di session.
    // jika datanya tersimpan di session maka boleh untuk mengakses fitur yang diinginkan,
    // jika datanya tidak tersimpan disession maka akan dikembalikan dihalaman login

    if(request.session.dataUser === undefined){
        return response.redirect(`/auth`)
    } else{
        // lanjut kefitur yang diinginkan
        next()
    }
}