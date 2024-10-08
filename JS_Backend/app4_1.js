const http = require('http')
const fs = require('fs')
const mysql = require('mysql2')
const URL = require('url')
const qs = require('querystring')


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'jfd_belajar_database'
})

db.connect()

let server = http.createServer(function (request, response) {
    // console.log(qs.parse(URL.parse(request.url).query).Name)
    let qstring = qs.parse(URL.parse(request.url).query)
    console.log(qstring)
    if (qstring.name) {
        db.query(`SELECT * FROM karyawan WHERE Name = ?`, [qstring.name], function (error, hasil) {
            if (error) {
                console.log(error)
            } else {
                return response.write (
                    `<pre>
                     ${JSON.stringify(hasil)}
                     <pre>`
                )
            }
        })
    }

    if (request.url == '/') {
        response.writeHead(200, {'Content-Type': 'text/html'})
        fs.createReadStream('./view/home.html').pipe(response)
    } else if (request.url == '/karyawan') {
        response.writeHead(200, {'Content-Type': 'text/html'})
        db.query("SELECT * FROM karyawan", function (error, hasil) {
            if (error) {
                console.log(error)
            } else {
                // buat variabel kosong
                let datakry = ''
                for (let i = 0; i < hasil.length; i++) {
                    // isi cariabel kosong dengan loopingan dara dari db
                    datakry += hasil[i].Name + ' - ' + hasil[i].Gender + '<br>'
                }
                // kirim ke frontend menggunakan respon manual
                // karena fs.createReadStream tidak mampu
                // menerima kirimin data dari backend
                response.write (
                    `<h1>Daftar Karyawan</h1><hr>
                     ${datakry}
                     <pre>
                     ${JSON.stringify(hasil, null, 4)}
                     <pre>`
                )
            }
        })
    } else {
        response.writeHead(200, {'Content-Type': 'text/html'})
        fs.createReadStream('./view/error404.html').pipe(response)
    }
})

server.listen(3000, function() {
    console.log('Server is listening on port 3000, http://localhost:3000')
})
