const http = require('http')
const fs = require('fs')
const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'jfd_belajar_database'
})

db.connect()

let server = http.createServer(function (request, response) {
    if (request.url == '/') {
        response.writeHead(200, {'Content-Type': 'text/html'})
        fs.createReadStream('./view/home.html').pipe(response)
    } else if (request.url == '/karyawan') {
        response.writeHead(200, {'Content-Type': 'text/html'})
        db.query("SELECT * FROM karyawan", function (error, hasil) {
            if (error) {
                console.log(error)
            } else {
                let htmlContent = `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Daftar Karyawan</title>
                        <style>
                            table {
                                width: 100%;
                                border-collapse: collapse;
                            }
                            table, th, td {
                                border: 1px solid black;
                            }
                            th, td {
                                padding: 8px;
                                text-align: left;
                            }
                            th {
                                background-color: #f2f2f2;
                            }
                        </style>
                    </head>
                    <body>
                        <h1>Daftar Karyawan</h1>
                        <table>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Address</th>
                                <th>NIP</th>
                            </tr>`
                
                // Generate table rows from the database results
                hasil.forEach(function (karyawan) {
                    htmlContent += `
                            <tr>
                                <td>${karyawan.ID}</td>
                                <td>${karyawan.Name}</td>
                                <td>${karyawan.Gender}</td>
                                <td>${karyawan.Address}</td>
                                <td>${karyawan.NIP}</td>
                            </tr>`
                })

                htmlContent += `
                        </table>
                    </body>
                    </html>`
                
                response.end(htmlContent)
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
