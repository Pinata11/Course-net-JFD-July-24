const db = require('../config/database').db

module.exports = {
    get_semuaAgama: () => {
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
}
