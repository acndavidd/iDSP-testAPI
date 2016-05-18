'use strict';
var faker = require('faker'),
    Promise = require('promise'),
    sharedAPI = require('../js/sharedAPI.js');

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
    var fakeData=[];
    for(var i=1;i<11;i++){
      var temp = {
        dist_id: 'DIST' + sharedAPI.pad(i,4),
        dist_name: faker.name.findName()
      };
      fakeData.push(temp);
    }

    return queryInterface.bulkInsert('mst_dist', fakeData, {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('mst_dist', null, {});
  }
};
