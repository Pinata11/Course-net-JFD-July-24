// const db = require('./config/database').db
const execute = require('../config/database').execute
const mysql = require('mysql2')

module.exports = {

    get_semuaKaryawan: () => {
        return execute(mysql.format(
            "SELECT * FROM karyawan"
        ))
    },

    get_satuKaryawan: (idk) => {
        return execute(mysql.format(
            `SELECT
            karyawan.*,
            department.Code AS code_dept, department.Name AS name_dept,
            agama.Name AS name_agama
        FROM karyawan
        LEFT JOIN department  ON department.ID = karyawan.department_id
        LEFT JOIN agama  ON agama.ID = karyawan.agama_id
        WHERE karyawan.ID = ?`,
        [idk]
        ))
    },

    hapus_satuKaryawan: (idk) => {
        return execute(mysql.format(
            `DELETE FROM karyawan
            WHERE id = ?`,
        [idk]
        ))
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
        return execute(mysql.format(
            `INSERT INTO karyawan SET ?`,
        [data]
        ))
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
        return execute(mysql.format(
            `UPDATE karyawan SET ? WHERE id = ?`,
        [data, idk]
        ))
    }
}