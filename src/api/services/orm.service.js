"use strict";
var path = require("path");
var env = process.env.NODE_ENV || "development";
var config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
var Sequelize = require("sequelize");
var db_orm = require('../model/');
class ORMService {
    constructor() {
        db_orm.setup(config.db.name, config.db.username, config.db.password, {
            host: config.db.host,
            native: false,
            dialect: config.db.dialect
        });
    }
    executeFunction(req, res) {
        var sequelize = db_orm.sequelize();
        console.log(req.param('id'));
        return sequelize.transaction(function (t) {
            var id = req.param('id');
            // chain all your queries here. make sure you return them.
            return db_orm.model('public.user').create({
                userID: req.param('id') + 2,
                password: 'anjayy'
            }, { transaction: t }).then(function (user) {
                return db_orm.model('public.user').create({
                    userID: id + 1,
                    password: 'hihi'
                }, { transaction: t });
            });
        }).then(function (result) {
        }).catch(function (err) {
        });
    }
    refreshModels(req, res) {
        var proc = require('child_process').exec;
        var modelPath = req.body.path;
        var cmd = 'spgen -d ' + config.db.name + ' -u ' + config.db.username + ' -s ' + config.db.schema + ' -h ' + config.db.host;
        if (config.db.password && config.db.password !== '')
            cmd += ' -p ' + config.db.password;
        if (modelPath)
            cmd += ' -t ' + modelPath;
        proc(cmd, function (error, stdout, stderr) {
            if (error) {
                res.send(error);
            }
            var response = stdout.replace(new RegExp("info: (Created)/g"), "<br/>");
            res.send(response);
        });
    }
}
exports.ORMService = ORMService;
//# sourceMappingURL=orm.service.js.map