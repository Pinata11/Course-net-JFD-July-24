const express = require('express')
const app = express()
const port = 3000

app.get('/', (req,res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/about', (req,res) => {
    res.send('<h1>About Us</h1>')
})

app.post('/contact', (req,res) => {
    res.send('<h1>Contact Us</h1>')
})

app.put('/contact', (req,res) => {
    res.send('<h1>Contact Us</h1>')
})

app.delete('/blog/:id', (req,res) => {
    res.send(`<h1>Blog Post # ${req.params.id} deleted</h1>`)
})

app.listen(port, () => console.log(`Server is running, open it in http://localhost:3000`))