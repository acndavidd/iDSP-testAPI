var config = require('../conf/config.js');
export class MySql {
    constructor() {
    }
    executeQuery(query) {
        return new Promise(function (resolve, reject) {
            let mysql_con;
            let mysql = require('mysql');
            mysql_con = mysql.createConnection({
                host: config.mysql.servername,
                port: config.mysql.port,
                user: config.mysql.username,
                password: config.mysql.password,
                database: config.mysql.dbname
            });
            mysql_con.query(query, function (err, rows) {
                if (err) {
                    reject('error while executing query: ' + query);
                    console.error('error while executing query: ' + query);
                }
                resolve(rows);
                mysql_con.end(function (err) {
                    if (err) {
                        console.error('error closing connection: ' + err);
                    }
                });
            });
        });
    }
}
//# sourceMappingURL=mysql.service.js.map