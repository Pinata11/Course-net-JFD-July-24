const express = require('express')
const app = express()
const port = 3000


// untuk mengambil data yg ter-encoded(enkripsi) dari form html 
// yg dikirimkan melalui protokol http
app.use(express.urlencoded({extended:false}))
app.set('view engine', 'ejs')
app.set('views', './view-ejs')

// const m_karyawan = require('./model/m_karyawan')
// const m_department = require('./model/m_department')
// const m_agama = require('./model/m_agama')

const c_karyawan = require('./controller/c_karyawan')

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


app.get('/karyawan', c_karyawan.index)
app.get('/karyawan/detail/:id_karyawan', c_karyawan.detail)
app.get('/karyawan/hapus/:id_karyawan', c_karyawan.delete)
app.get('/karyawan/tambah', c_karyawan.add)
app.post('/karyawan/proses-insert', c_karyawan.proses_add)
app.get('/karyawan/edit/:id_karyawan', c_karyawan.update)
app.post('/karyawan/proses-update/:id_karyawan', c_karyawan.proses_update)

app.listen(port, () =>
  console.log(`Server is running, open it in http://localhost:` + port)
)
