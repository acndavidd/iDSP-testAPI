"use strict";
var vPath = require("path");
var vEnv = process.env.NODE_ENV || "DEVELOPMENT";
var vConfig = require(vPath.join(__dirname, '..', 'config', 'config.json'))[vEnv];
var vSequelize = require("sequelize");
var vFs = require('fs');
var vToday = Date.now();
var vDate = new Date(vToday);
var vDebugFile = vPath.join(__dirname, '..', 'debug', vDate.getDate() + '-' + (vDate.getMonth() + 1) + '-' + vDate.getFullYear() + '.debug.js');
var vDebugFD;
class SequelizeService {
    constructor() {
        try {
            SequelizeService.sequelize = new vSequelize(vConfig.db.name, vConfig.db.username, vConfig.db.password, {
                dialect: vConfig.db.dialect,
                host: vConfig.db.host,
                port: vConfig.db.port,
                timezone: vConfig.db.timezone,
                // enables logging for query executed in DEVELOPMENT environment
                logging: (vEnv === 'DEVELOPMENT') ? function (pLog) {
                    vDebugFD = vFs.openSync(vDebugFile, 'a');
                    vDate = new Date(Date.now());
                    vFs.writeSync(vDebugFD, vDate.getHours() + ':' + vDate.getMinutes() + ':' + vDate.getSeconds() + ' - ' + pLog + '\n');
                    vFs.closeSync(vDebugFD);
                } : false
            });
        }
        catch (pErr) {
            console.log('Error while establishing database connection with sequelize : ' + pErr);
            throw pErr;
        }
    }
}
exports.SequelizeService = SequelizeService;
//# sourceMappingURL=sequelize.service.js.map