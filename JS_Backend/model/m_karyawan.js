const db = require('../config/database').db

module.exports = {

    get_semuaKaryawan: () => {
        return new Promise( (resolve,reject)=>{
            db.query("SELECT * FROM karyawan", function(errorSql, hasil) {
                if (errorSql) {
                    reject(errorSql)
                } else {
                    resolve(hasil)
                }
            })
        })
    },

    get_satuKaryawan: (idk) => {
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
    },

    hapus_satuKaryawan: (idk) => {
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
    },

    insert_karyawan:(req) => {
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
    },

    update_karyawan: (req, idk) => {
        let data = {
        Name          : req.body.form_full_name,
        Gender        : req.body.form_gender,
        Address       : req.body.form_address,
        NIP           : req.body.form_nip,
        department_id : req.body.form_department,
        agama_id      : req.body.form_agama
        }
        let sql = `UPDATE karyawan SET ? WHERE id = ?`;
    
        return new Promise( (resolve,reject)=>{
            db.query(sql, [data, idk], function(errorSql, hasil) {
                if (errorSql) {
                    reject(errorSql)
                } else {
                    resolve(hasil)
                }
            })
        })
    }

}