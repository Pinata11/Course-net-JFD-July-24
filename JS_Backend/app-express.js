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


// untuk mengambil data yg ter-encoded(enkripsi) dari form html 
// yg dikirimkan melalui protokol http
app.use(express.urlencoded({extended:false}))
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
app.get('/karyawan', async (req,res) => {
  let dataview = {
      karyawan: await get_semuaKaryawan()
  }
  res.render('karyawan/index', dataview)
})



app.get('/karyawan/detail/:id_karyawan', async (req,res) => {

  // ambil id yang dikirim via url
  let idk = req.params.id_karyawan

  // setelah itu kirim ke proses request data mysql
  let dataview = {
      pegawai: await get_satuKaryawan(idk),
  }
  res.render('karyawan/detail', dataview)
})


function get_satuKaryawan(idk) {
  let sql = 
    `SELECT
        karyawan.*,
        department.Code AS code_dept, department.Name AS name_dept,
        agama.Name AS name_agama
    FROM karyawan
    LEFT JOIN department  ON department.ID = karyawan.department_id
    LEFT JOIN agama  ON agama.ID = karyawan.agama_id
    WHERE karyawan.ID = ?`;

  return new Promise( (resolve,reject)=>{
      db.query(sql, [idk], (errorSql, hasil) => {
          if (errorSql) {
              reject(errorSql)
          } else {
              resolve(hasil)
          }
      })
  })
}


app.get('/karyawan/hapus/:id_karyawan', async function(req,res) {
  // ambil id yang dikirim via url
  let idk = req.params.id_karyawan

  // proses hapus data
  try {
      let hapus = await hapus_satuKaryawan(idk)
      if (hapus.affectedRows > 0) {
          res.redirect('/karyawan')
      }
  } catch (error) {
      throw error
  }
})


function hapus_satuKaryawan(idk) {
  let sql = 
  `DELETE FROM karyawan
  WHERE id = ?`;

  return new Promise( (resolve,reject)=>{
      db.query(sql, [idk], function(errorSql, hasil) {
          if (errorSql) {
              reject(errorSql)
          } else {
              resolve(hasil)
          }
      })
  })
}

app.get('/karyawan/tambah', async (req,res) => {
  let dataview = {
      dept: await get_semuaDepartment(),
      agm: await get_semuaAgama(),
  }
  res.render('karyawan/form-tambah', dataview)
})

function get_semuaDepartment() {
  return new Promise( (resolve,reject)=>{
      db.query("SELECT * FROM department", function(errorSql, hasil) {
          if (errorSql) {
              reject(errorSql)
          } else {
              resolve(hasil)
          }
      })
  })
}

function get_semuaAgama() {
  return new Promise( (resolve,reject)=>{
      db.query("SELECT * FROM agama", function(errorSql, hasil) {
          if (errorSql) {
              reject(errorSql)
          } else {
              resolve(hasil)
          }
      })
  })
}

app.post('/karyawan/proses-insert', async (req,res) => {
  // terima kiriman dataa dari form html
  // let body = req.body

  try {
    let insert = await insert_karyawan(req)
      if (insert.affectedRows > 0) {
        res.redirect('/karyawan')
      }
  } catch (error) {
    throw error
  }
})

function insert_karyawan(req) {
  let data = {
    Name          : req.body.form_full_name,
    Gender        : req.body.form_gender,
    Address       : req.body.form_address,
    NIP           : req.body.form_nip,
    department_id : req.body.form_department,
    agama_id      : req.body.form_agama,
  }
  let sql = 'INSERT INTO karyawan SET ?';
  return new Promise( (resolve,reject)=>{
      db.query(sql, [data], (errorSql, hasil) => {
          if (errorSql) {
              reject(errorSql)
          } else {
              resolve(hasil)
          }
      })
  })
}

app.get('/karyawan/edit/:id_karyawan', async (req,res) => {
  let idk = req.params.id_karyawan
  let dataview = {
    dept    : await get_semuaDepartment(),
    agm     : await get_semuaAgama(),
    pegawai : await get_satuKaryawan(idk),
  }
  res.render('karyawan/form-edit', dataview)
})

app.listen(port, () =>
  console.log(`Server is running, open it in http://localhost:` + port)
)
