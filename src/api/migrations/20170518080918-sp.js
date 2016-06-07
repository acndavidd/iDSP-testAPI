'use strict';

module.exports = {
  
  up: function (queryInterface, Sequelize) {
    var vPath = require("path");
    var vFs = require('fs');
    var vEnv = process.env.NODE_ENV || "development";
    var vDebug = (vEnv === 'development') ? true : false;
    var vMigrate = [];
    var funct = null;
    var timer = 100000;
    vFs.readdirSync(vPath.join('migrations','SP_Scripts')).forEach(function(pSP){
      var vQuery = vFs.readFileSync(vPath.join('migrations','SP_Scripts',pSP), 'utf-8');
      if(!funct) funct = queryInterface.sequelize.query(vQuery);
      else {
        funct = funct.then(function(){
            // console.log(vQuery);
            timer = 50000;
            while(timer-- > 0){console.log("");}
            console.log('== == migrating : ' + pSP);
            queryInterface.sequelize.query(vQuery)
        });
      }
      // vMigrate.push(queryInterface.sequelize.query(vQuery));
    });
    return funct;
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
