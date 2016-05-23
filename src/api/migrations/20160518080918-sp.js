'use strict';

module.exports = {
  
  up: function (queryInterface, Sequelize) {
    var vPath = require("path");
    var vFs = require('fs');
    var vEnv = process.env.NODE_ENV || "development";
    var vDebug = (vEnv === 'development') ? true : false;
    var vMigrate = [];
    vFs.readdirSync(vPath.join('migrations','SP_Scripts')).forEach(function(pSP){
      var vQuery = vFs.readFileSync(vPath.join('migrations','SP_Scripts',pSP), 'utf-8');
      vMigrate.push(queryInterface.sequelize.query(vQuery));
    });
    return vMigrate;
  },

  down: function (queryInterface, Sequelize) {
    var vPath = require("path");
    var vFs = require('fs');
    var vEnv = process.env.NODE_ENV || "development";
    var vDebug = (vEnv === 'development') ? true : false;
    var vMigrate = [];
    vFs.readdirSync(vPath.join('migrations','SP_Scripts')).forEach(function(pSP){
      try{
        if(pSP !=='migrate_SP.sql'){
          pSP = pSP.replace(".sql","");
          vMigrate.push(queryInterface.sequelize.query("SELECT migrate_SP('"+pSP+"')"));
        }
      }catch(pErr){
          console.log("Error Occurred when undo migration SP " + pSP + " Error : " + pErr);
      }
    });
    return vMigrate;
  }
};
