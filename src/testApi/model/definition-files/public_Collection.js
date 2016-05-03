/*jslint node: true */
"use strict";
/*------------------------------------------------------------------------------------

DO NOT EDIT THIS FILE !!! It is generated automatically and will be overwritten.

To modify this model:
1. Create 'Collection.js' file in 'definition-files-custom' directory located in this file's parent directory.
2. Copy the code below and paste it into 'Collection.js'.
3. Use utility methods to easily access orm properties.

"use strict";
var orm     = require('model\index.js'),
    model   = require('./Collection.js'),
    util    = require('../utils.js')(model),
    Seq     = orm.Sequelize();

module.exports = model;

// Some utility methods:

util.getAttribute("collectionID").comment = 'This is the comment'; 

------------------------------------------------------------------------------------*/
var orm = require('../index.js'),
    Seq = orm.Sequelize();
module.exports = {
    modelName: "public.collection",
    options: {
        tableName: "Collection",
        schema: "public",
        timestamps: false
    },
    attributes: {
        "collectionID": {
            type: Seq.INTEGER,
            field: "collectionID",
            primaryKey: true,
            allowNull: false,
            unique: "Collection_pkey"
        },
        "userID": {
            type: Seq.INTEGER,
            field: "userID"
        },
        "retailerID": {
            type: Seq.INTEGER,
            field: "retailerID"
        },
        "amount": {
            type: Seq.DECIMAL(10, 2),
            field: "amount"
        },
        "transactionDate": {
            type: Seq.DATEONLY,
            field: "transactionDate"
        },
        "accountReceivableID": {
            type: Seq.INTEGER,
            field: "accountReceivableID"
        },
        "paymentStatus": {
            type: Seq.STRING,
            field: "paymentStatus"
        }
    },
    relations: []
};