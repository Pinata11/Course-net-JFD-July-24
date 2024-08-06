let nama = 'Uchiha Sasuke'
let alamat = 'konoha'

function biodata() {
        return `Biodata Karyawan \n
        ================ \n
        Nama: ${nama} \n
        Alamat: ${alamat} \n`
}

module.exports = {
    nama,
    alamat,
    print: biodata
}