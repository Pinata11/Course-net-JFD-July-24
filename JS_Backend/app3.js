const http = require('http')
const fs = require('fs')

let server = http.createServer(function (request, response) {
    if (request.url == '/') {
        response.writeHead(200, {'Content-Type': 'text/html'})
        response.write('Halaman beranda')
        response.end()
    } else if (request.url == '/profil') {
        fs.createReadStream('./view/profile.html').pipe(response)
    } else if (request.url == '/news') {
        response.writeHead(404, {'Content-Type': 'text/html'})
        response.write(`
            <h1>Berita saat ini</h1><hr>
            Judul berita 1 : Lorem ipsum ... <br>
            Judul berita 2 : Lorem ipsum ... <br>
            Judul berita 3 : Lorem ipsum ... <br>
            Judul berita 4 : Lorem ipsum ... <br>
            Judul berita 5 : Lorem ipsum ... <br>
            `)
        response.end()
    } else {
        response.writeHead(404, {'Content-Type': 'text/plain'})
        response.write('404 Not Found')
        response.end()
    }
})

server.listen(3000, function() {
    console.log('Server is listening on port 3000, http://localhost:3000')
})
