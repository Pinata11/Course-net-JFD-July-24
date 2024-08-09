const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.set('views', './view-ejs')

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/contact', (req, res) => {
  let contact = {
    ig: 'vin_nick1',
    wa: '08119252563',
    no: '08119252563',
    line: 'davinnichol',
  }
  res.render('contact', contact)
})

app.get('/profile', (req, res) => {
  let profile = {
    role: 'Web Developer',
    gender: 'Male',
    gaji: '3000000'
  }
  res.render('profile-developer', profile)
})

app.listen(port, () =>
  console.log(`Server is running, open it in http://localhost:3000`)
)
