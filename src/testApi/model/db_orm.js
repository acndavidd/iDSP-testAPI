var path      = require("path");
var dbconn    = require(path.join(__dirname, '..', 'config', 'dbconn.js'));
var db_orm = require('../model');
    db_orm.setup(dbconn.name, dbconn.user, dbconn.pass, {
        host: dbconn.host,
        //logging: false,
        native: false,
        dialect: dbconn.dialect
    });
var sequelize = db_orm.sequelize;
module.exports = db_orm;