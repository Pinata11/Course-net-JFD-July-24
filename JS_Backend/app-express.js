const express = require('express')
const app = express()
const port = 3000
const mysql     = require('mysql2')
const db        = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'jfd_belajar_database',
})
db.connect()

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

// buat function terpisah untuk
// proses pengambilan data dari mysql
function get_semuaKaryawan() {
  return new Promise( (resolve,reject)=>{
      db.query("SELECT * FROM karyawan", function(errorSql, hasil) {
          if (errorSql) {
              reject(errorSql)
          } else {
              resolve(hasil)
          }
      })
  })
}


// gunakan async await, untuk memaksa node js
// menunggu script yg dipanggil sampai selesai di ekseskusi
app.get('/karyawan', async function(req,res) {
  let dataview = {
      karyawan: await get_semuaKaryawan()
  }
  res.render('karyawan/index', dataview)
})



app.get('/karyawan/detail/:id_karyawan', async function(req,res) {

  // ambil id yang dikirim via url
  let idk = req.params.id_karyawan

  // setelah itu kirim ke proses request data mysql
  let dataview = {
      pegawai: await get_satuKaryawan(idk),
  }
  res.render('karyawan/detail', dataview)
})


function get_satuKaryawan(idk) {
  return new Promise( (resolve,reject)=>{
      db.query("SELECT * FROM karyawan WHERE id = ?", [idk], function(errorSql, hasil) {
          if (errorSql) {
              reject(errorSql)
          } else {
              resolve(hasil)
          }
      })
  })
}

app.listen(port, () =>
  console.log(`Server is running, open it in http://localhost:` + port)
)
