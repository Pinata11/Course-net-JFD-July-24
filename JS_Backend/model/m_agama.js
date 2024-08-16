const execute = require('../config/database').execute
const mysql = require('mysql2')

module.exports = {
    get_semuaAgama: () => {
        return execute(mysql.format(
            "SELECT * FROM agama"
        ))
    }
}
