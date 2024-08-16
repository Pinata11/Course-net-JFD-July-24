const m_karyawan = require('../model/m_karyawan')
const m_department = require('../model/m_department')
const m_agama = require('../model/m_agama')

module.exports = {
    index: async (req,res) => {
        // ambil object query string msg
      
        let dataview = {
            karyawan: await m_karyawan.get_semuaKaryawan(),
            update_msg: req.query.umsg,
            add_msg: req.query.amsg
        }
        res.render('karyawan/index', dataview)
      },
    
    detail: async (req,res) => {

        // ambil id yang dikirim via url
        let idk = req.params.id_karyawan
      
        // setelah itu kirim ke proses request data mysql
        let dataview = {
            pegawai: await m_karyawan.get_satuKaryawan(idk),
        }
        res.render('karyawan/detail', dataview)
      },
    
    delete: async function(req,res) {
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
      },

    add: async (req,res) => {
        let dataview = {
            dept: await m_department.get_semuaDepartment(),
            agm: await m_agama.get_semuaAgama(),
        }
        res.render('karyawan/form-tambah', dataview)
      },

    proses_add: async (req,res) => {
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
      },
    
    update: async (req,res) => {
        let idk = req.params.id_karyawan
        let dataview = {
          dept    : await m_department.get_semuaDepartment(),
          agm     : await m_agama.get_semuaAgama(),
          pegawai : await m_karyawan.get_satuKaryawan(idk),
        }
        res.render('karyawan/form-edit', dataview)
      },
    
    proses_update: async (req,res) => {
        let idk = req.params.id_karyawan
        try {
            let update = await m_karyawan.update_karyawan(req, idk)
            if (update.affectedRows > 0) {
                res.redirect(`/karyawan?umsg=berhasil update ${req.body.form_full_name}`)
            }
        } catch (error) {
            throw error
        }
      },
}