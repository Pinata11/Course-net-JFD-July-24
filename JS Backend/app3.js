const http = require('http')

let server = http.createServer(function (request, response) {
    if (request.url == '/') {
        response.writeHead(200, {'Content-Type': 'text/html'})
        response.write('Halaman beranda')
        response.end()
    } else if (request.url == '/profil') {
        response.writeHead(200, {'Content-Type': 'text/html'})
        response.write('My profile')
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
