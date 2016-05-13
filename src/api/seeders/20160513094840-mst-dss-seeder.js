'use strict';
var faker = require('faker');

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    var dssData=[];
    for(var i=1;i<11;i++){
      var tempDSS = {
        dss_id: 'DSS' + i,
        dist_id: 'DIST' + i,
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName()
      };
      dssData.push(tempDSS);
    }
    return queryInterface.bulkInsert('mst_dss', dssData, {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('mst_dss', null, {});
  }
};
