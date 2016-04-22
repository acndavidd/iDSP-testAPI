System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var config, MySql;
    return {
        setters:[],
        execute: function() {
            config = require('../conf/config.js');
            MySql = (function () {
                function MySql() {
                }
                MySql.prototype.executeQuery = function (query) {
                    return new Promise(function (resolve, reject) {
                        var mysql_con;
                        var mysql = require('mysql');
                        mysql_con = mysql.createConnection({
                            host: config.mysql.servername,
                            port: config.mysql.port,
                            user: config.mysql.username,
                            password: config.mysql.password,
                            database: config.mysql.dbname
                        });
                        mysql_con.query(query, function (err, rows) {
                            if (err) {
                                reject(err + 'error bro');
                                console.error('error while executing query: ' + query);
                                return;
                            }
                            resolve(rows);
                        });
                        mysql_con.end(function (err) {
                            console.error('error closing connection: ');
                        });
                    });
                };
                return MySql;
            }());
            exports_1("MySql", MySql);
        }
    }
});
//# sourceMappingURL=mysql.service.js.map