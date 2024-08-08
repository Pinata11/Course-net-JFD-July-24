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

// let sql = 
// `INSERT INTO karyawan
//  SET Name = 'Prabowo'
//  WHERE id = 7 `

let sql = 
`DELETE FROM karyawan
 WHERE Name = 'name' `

// ambil data dari database
db.query(sql, function (error, hasil) {
    if (error) {
        console.log(error)
    } else {
        if (hasil.affectedRows > 0) {
            console.log('Data berhasil dihapus!')
        }
    }
})

db.end()