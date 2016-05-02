/*jslint node: true */
"use strict";
/*------------------------------------------------------------------------------------

DO NOT EDIT THIS FILE !!! It is generated automatically and will be overwritten.

To modify this model:
1. Create 'users.js' file in 'definition-files-custom' directory located in this file's parent directory.
2. Copy the code below and paste it into 'users.js'.
3. Use utility methods to easily access orm properties.

"use strict";
var orm     = require('model\index.js'),
    model   = require('./users.js'),
    util    = require('../utils.js')(model),
    Seq     = orm.Sequelize();

module.exports = model;

// Some utility methods:
util.getRelation("userProfiles").onDelete = 'CASCADE'; 
util.getAttribute("id").comment = 'This is the comment'; 

------------------------------------------------------------------------------------*/
var orm = require('../index.js'),
    Seq = orm.Sequelize();
module.exports = {
    modelName: "public.users",
    options: {
        tableName: "users",
        schema: "public",
        timestamps: false
    },
    attributes: {
        "id": {
            type: Seq.INTEGER,
            field: "id",
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: "user_pkey"
        },
        "firstName": {
            type: Seq.STRING(255),
            field: "first_name"
        },
        "lastName": {
            type: Seq.STRING(255),
            field: "last_name"
        },
        "createdAt": {
            type: Seq.DATE,
            field: "createdAt"
        },
        "updatedAt": {
            type: Seq.DATE,
            field: "updatedAt"
        }
    },
    relations: [{
        type: "hasMany",
        model: "public.profile",
        schema: "public",
        table: "profile",
        source: "generator",
        details: {
            as: "userProfiles",
            foreignKey: "user_id",
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION"
        }
    }]
};