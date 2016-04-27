"use strict";
var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var env       = process.env.NODE_ENV || "development";
var config    = require(path.join(__dirname, '..', 'conf', 'config.json'))['development'];
var sequelize = new Sequelize(config.db.name, config.db.username, config.db.password, {dialect : config.db.dialect , port : config.db.port});
var db        = {};
fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js") && (file.indexOf(".js.map") == -1) && (file.indexOf(".ts") == -1);
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    console.log(model.name);
    db[model.name] = model;
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;