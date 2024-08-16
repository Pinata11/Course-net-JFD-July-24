const execute = require('../config/database').execute
const mysql = require('mysql2')

module.exports = {
    get_semuaDepartment: () => {
        return execute(mysql.format(
            "SELECT * FROM department"
        ))
    }
}
