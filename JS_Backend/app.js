const http = require('http')

let server = http.createServer(function (request, response) {
    // mendeteksi status http 200 (user berhasil terkoneksi dengan aplikasi kita)
    // content-tyoe: apa tipe konten yg ingin diberikan ke user
    // text/plain itu akan menampilkan teks apa adanya
    // text/html akan merender tag html menjadi tampilan di browser
    response.writeHead(200, {'Content-Type': 'text/html'})
    // hasil akhir yang akan diberikan ke user
    response.end('<h1>Hello!</h1>')
})
server.listen(3000, function() {
    console.log('Server is listening on port 3000')
})
