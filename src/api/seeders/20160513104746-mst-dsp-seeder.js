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
    var dspData=[];
    for(var i=1;i<11;i++){
      var tempDSP = {
        dsp_id: 'DSP' + i,
        dss_id: 'DSS' + i,
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        dealer_min_smart: faker.random.number(),
        dealer_min_sun: faker.random.number()
      };
      dspData.push(tempDSP);
    }
    return queryInterface.bulkInsert('mst_dsp', dspData, {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('mst_dsp', null, {});
  }
};
