import {SequelizeService} from './sequelize.service';

var vPath = require("path");
var vFs = require('fs');

export class ORMService{
	constructor(){
		
	}

	public syncModel(pRequest,pResponse){
		let vSequelizeSvc:SequelizeService = new SequelizeService();
		try{
			var vModel = vSequelizeSvc.getInstance().import(vPath.join(vSequelizeSvc.getModelPath(),pRequest.query.model + vSequelizeSvc.getModelNaming()));
			vModel.sync();
			pResponse.send('success');
		}catch(err){
			console.log(err);
			pResponse.send(err);
		}
	}

	public getModel(pModelName:string){
		let vSequelizeSvc:SequelizeService = new SequelizeService();
		try{
			return  vSequelizeSvc.getInstance().import(vPath.join(vSequelizeSvc.getModelPath(),pModelName + vSequelizeSvc.getModelNaming()));
		}catch(err){
			console.log(err);
			throw err;
		}
	}
	/*
	public syncAllModel(pRequest,pResponse){
		let vSequelizeSvc:SequelizeService = new SequelizeService();
		try{
			vFs.readdirSync(vPath.join(vSequelizeSvc.getModelPath()),function(file){
				console.log(file);
			});
			//vSequelizeSvc.getInstance().import(vPath.join(vSequelizeSvc.getModelPath(),pModelName + vSequelizeSvc.getModelNaming()));
		}catch(err){
			console.log(err);
			throw err;
		}
	}*/
}