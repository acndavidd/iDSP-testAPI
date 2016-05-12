import {SequelizeService} from './sequelize.service';

var vPath = require("path");
var vFs = require('fs');
var vExec = require('child_process').spawn;

export class ORMService{
	private model;
	constructor(){

	}

	public getSequelize(){
		let vSequelizeSvc:SequelizeService = new SequelizeService();
		return vSequelizeSvc.getInstance();
	}

	public buildModels(pRequest,pResponse){
		try{
			let vPS = vExec('powershell.exe');
			vPS.stdout.on('data',(data) => {
				console.log('output : ' + data);
			});
			vPS.stderr.on('data', (error) => {
				console.log('error : ' + error);
			});
			vFs.readFile('models/tables', 'UTF-8', 'r' , (err,data) => {
				if(err)throw err;
				data.split('\n').forEach(function(pLine){
					console.log('execute ' + pLine);
					vPS.stdin.write(pLine);
				});
			});
			vPS.stdin.end();
		}catch(err){
			console.log(err);
			pResponse.json(err);
		}
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
		let vOrmSvc = this;

		let vModelStr;
		try{
			let vModel = vSequelizeSvc.getInstance().import(vPath.join(vSequelizeSvc.getModelPath(),pModelName + vSequelizeSvc.getModelNaming()));
			let associatedModels = {};
			
			if("getAssociatedModels" in vModel)
				vModel.getAssociatedModels().forEach(function(associatedModel){
					vModelStr = associatedModel;
					let assocModel = vSequelizeSvc.getInstance().import(vPath.join(vSequelizeSvc.getModelPath(),associatedModel + vSequelizeSvc.getModelNaming()));
					associatedModels[associatedModel] = assocModel;
				});

			if("associate" in vModel){
				vModel.associate(associatedModels);
			}
			return vModel;
		}catch(err){
			console.log("Error in get Model : "+ err + " : in model " + vModelStr);
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