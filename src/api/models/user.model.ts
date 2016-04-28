"use strict";

module.exports = function(sequelize,DataTypes){
	var user = sequelize.define('User',{
		username : DataTypes.STRING,
		password : DataTypes.STRING
	});
	return user;
}