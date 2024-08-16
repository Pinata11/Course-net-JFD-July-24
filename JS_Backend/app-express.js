const express = require('express')
const app = express()
const port = 3000


// untuk mengambil data yg ter-encoded(enkripsi) dari form html 
// yg dikirimkan melalui protokol http
app.use(express.urlencoded({extended:false}))
app.set('view engine', 'ejs')
app.set('views', './view-ejs')

const m_karyawan = require('./model/m_karyawan')
const m_department = require('./model/m_department')
const m_agama = require('./model/m_agama')

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


// gunakan async await, untuk memaksa node js
// menunggu script yg dipanggil sampai selesai di ekseskusi
app.get('/karyawan', async (req,res) => {
  // ambil object query string msg

  let dataview = {
      karyawan: await m_karyawan.get_semuaKaryawan(),
      update_msg: req.query.umsg,
      add_msg: req.query.amsg
  }
  res.render('karyawan/index', dataview)
})



app.get('/karyawan/detail/:id_karyawan', async (req,res) => {

  // ambil id yang dikirim via url
  let idk = req.params.id_karyawan

  // setelah itu kirim ke proses request data mysql
  let dataview = {
      pegawai: await m_karyawan.get_satuKaryawan(idk),
  }
  res.render('karyawan/detail', dataview)
})


app.get('/karyawan/hapus/:id_karyawan', async function(req,res) {
  // ambil id yang dikirim via url
  let idk = req.params.id_karyawan

  // proses hapus data
  try {
      let hapus = await m_karyawan.hapus_satuKaryawan(idk)
      if (hapus.affectedRows > 0) {
          res.redirect('/karyawan')
      }
  } catch (error) {
      throw error
  }
})

app.get('/karyawan/tambah', async (req,res) => {
  let dataview = {
      dept: await m_department.get_semuaDepartment(),
      agm: await m_agama.get_semuaAgama(),
  }
  res.render('karyawan/form-tambah', dataview)
})

app.post('/karyawan/proses-insert', async (req,res) => {
  // terima kiriman dataa dari form html
  // let body = req.body

  try {
    let insert = await m_karyawan.insert_karyawan(req)
      if (insert.affectedRows > 0) {
        res.redirect(`/karyawan?amsg=berhasil insert ${req.body.form_full_name}`)
      }
  } catch (error) {
    throw error
  }
})

app.get('/karyawan/edit/:id_karyawan', async (req,res) => {
  let idk = req.params.id_karyawan
  let dataview = {
    dept    : await m_department.get_semuaDepartment(),
    agm     : await m_agama.get_semuaAgama(),
    pegawai : await m_karyawan.get_satuKaryawan(idk),
  }
  res.render('karyawan/form-edit', dataview)
})

app.post('/karyawan/proses-update/:id_karyawan', async (req,res) => {
  let idk = req.params.id_karyawan
  try {
      let update = await m_karyawan.update_karyawan(req, idk)
      if (update.affectedRows > 0) {
          res.redirect(`/karyawan?umsg=berhasil update ${req.body.form_full_name}`)
      }
  } catch (error) {
      throw error
  }
})

app.listen(port, () =>
  console.log(`Server is running, open it in http://localhost:` + port)
)
