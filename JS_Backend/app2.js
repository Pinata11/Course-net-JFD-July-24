const http = require('http')

let server = http.createServer(function (request, response) {
    let nama = 'Davin N'
    let alamat = 'BSD'
    let html = `<h1>Nama saya ${nama}, saya tinggal di ${alamat}</h1>`
    response.writeHead(200, {'Content-Type': 'text/html'})
    response.end(html)
})

server.listen(3000, function() {
    console.log('Server is listening on port 3000, http://localhost:3000')
})
