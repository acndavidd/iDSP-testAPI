import {SequelizeService} from './sequelize.service';

var vPath = require("path");
var vFs = require('fs');

export class ORMService{
	constructor(){
		
	}

	public syncModel(pRequest,pResponse){
		let sequelizeSvc:SequelizeService = new SequelizeService();
		try{
			var vModel = sequelizeSvc.getInstance().import(vPath.join(sequelizeSvc.getModelPath(),pRequest.query.model + sequelizeSvc.getModelNaming()));
			vModel.sync();
			pResponse.send('success');
		}catch(err){
			console.log(err);
			pResponse.send(err);
		}
	}

	public getModel(pModelName:string){
		let sequelizeSvc:SequelizeService = new SequelizeService();
		try{
			return  sequelizeSvc.getInstance().import(vPath.join(sequelizeSvc.getModelPath(),pModelName + sequelizeSvc.getModelNaming()));
		}catch(err){
			console.log(err);
			throw err;
		}
	}

	public syncAllModel(pRequest,pResponse){
		let sequelizeSvc:SequelizeService = new SequelizeService();
		try{
			vFs.readdirSync(vPath.join(sequelizeSvc.getModelPath()),function(file){
				console.log(file);
			});
			//sequelizeSvc.getInstance().import(vPath.join(sequelizeSvc.getModelPath(),pModelName + sequelizeSvc.getModelNaming()));
		}catch(err){
			console.log(err);
			throw err;
		}
	}
}