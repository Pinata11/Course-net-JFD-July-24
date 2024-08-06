const http = require('http')
const mysql = require('mysql2')

// create connection to database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'jfd_belajar_database'
})

db.connect()

// ambil data dari database
db.query("SELECT * FROM karyawan", function (error, hasil) {
    if (error) {
        console.log(error)
    } else {
        console.log(hasil)
        console.log('===========')
        console.log(hasil[1].name)
        for (let i = 0; i < hasil.length; i++) {
            console.log(hasil[i].name)
        }
    }
})

db.end()