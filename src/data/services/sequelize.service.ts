var sequelize = require('sequelize');
var fs = require('fs');
export class SequelizeService{
	constructor(){

	}

	generateFromModel(){
		var models = fs.readdirSync('../models/');
		for(var i = 0 ; i < models.length ; i++){
			if(models[i].endsWith('.model.js')){
				if(models[i].indexOf('idsp') == -1){
					var model = require('../../models/' + models[i]);
					for(var key in model) {
						console.log(model.prorotype + "");
						console.log(model[key]+'');
					}
				}
			}
		}
	}

}