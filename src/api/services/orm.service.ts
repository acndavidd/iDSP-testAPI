import {SequelizeService} from './sequelize.service';

var vPath = require("path");
var vFs = require('fs');
var vEnv = process.env.NODE_ENV || "development";
var vExec = require('child_process').spawn;
var vDebug = (vEnv === 'development') ? true : false;

export class ORMService{
	private vModels;
	private vAssociatedModels;
	private vSequelizeSvc:SequelizeService;
	constructor(){
		this.vModels = {};
		let vOrmInstance = this;
		this.vSequelizeSvc = new SequelizeService();
		let vSequelizeSvc = this.vSequelizeSvc;
		if(vDebug)console.log('Begin loading models');
		vFs.readdirSync(vPath.join(vSequelizeSvc.getModelPath())).forEach(function(pModel){
			try{
				if(pModel.indexOf(vSequelizeSvc.getModelNaming()) !== -1){
					vOrmInstance.vModels[pModel.replace(vSequelizeSvc.getModelNaming(),'')] = vSequelizeSvc.getInstance().import(vPath.join(vSequelizeSvc.getModelPath(),pModel));
					if(vDebug)console.log('success loading model : ' + pModel);
				}
			}catch(pErr){
				console.log('Error occurred while loading model : ' + pModel + '\nError : ' + pErr);
			}
		});
		if(vDebug)console.log('Finished loading models');
		//process all associate relation
		if(vDebug)console.log('\n\nBegin loading association');
		for(var model in this.vModels){
			try{
				if("associate" in this.vModels[model]){
					this.vModels[model].associate(this.vModels);
					if(vDebug)console.log('success loading association for model : ' + model);
				}
			}catch(pErr){
				console.log('Error occurred while loading association for model : ' + model,'\nError : ' + pErr);
			}
		};
		if(vDebug)console.log('Finished loading association');
		//this.vAssociatedModels = {};
	}

	public async sp(pSPName:string,pParams:any) {
		let vSequelize = this.getSequelize();
		return new Promise<string>(
			function (pResolve,pReject){
				//build params
				let vParams = '(';
				for(let vParam in pParams){
					vParams += "'" + pParams[vParam] + "',";
				}
				vParams = vParams.substring(0,vParams.lastIndexOf(',')) + ');';
				vSequelize.query('SELECT ' + pSPName + vParams).then(function(pResponse){
					pResolve(pResponse[0][0][pSPName]);
				});
			});
		//return this.getSequelize().query('SELECT ' + pSPName + "('"+pParams+"');").then();
	}

	public getSequelize(){
		//let vSequelizeSvc:SequelizeService = new SequelizeService();
		return this.vSequelizeSvc.getInstance();
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
		return this.vModels[pModelName];
		/*
		console.log('loading ' + pModelName + ' model');
		let vSequelizeSvc:SequelizeService = new SequelizeService();
		let vOrmSvc = this;
		let vModelStr;
		try{
			let vModel = vSequelizeSvc.getInstance().import(vPath.join(vSequelizeSvc.getModelPath(),pModelName + vSequelizeSvc.getModelNaming()));
			vOrmSvc.vAssociatedModels[pModelName] = vModel;
			console.log('loading associated models for ' + pModelName + ' model');
			if("getAssociatedModels" in vModel){
				let vAssocModel;
				vModel.getAssociatedModels().forEach(function(pAssociatedModel){
					
					vModelStr = pAssociatedModel;
					if(vOrmSvc.vAssociatedModels.hasOwnProperty(pAssociatedModel) === false){
						console.log('\tloading associated model ' + pAssociatedModel + ' for ' + pModelName + ' model');
						vAssocModel = vOrmSvc.getModel(pAssociatedModel);
						//vAssocModel = vSequelizeSvc.getInstance().import(vPath.join(vSequelizeSvc.getModelPath(),pAssociatedModel + vSequelizeSvc.getModelNaming()));
						vOrmSvc.vAssociatedModels[pAssociatedModel] = vAssocModel;
					}else{
						console.log('\tskip loading ' + pAssociatedModel + ' model');
					}
				});
			}
			if("associate" in vModel){
				vModel.associate(vOrmSvc.vAssociatedModels);
			}
			vOrmSvc.vAssociatedModels[pModelName] = vModel;
			console.log('finish loading ' + pModelName + ' model');
			return vModel;
		}catch(pErr){
			console.log("Error in get Model : "+ pErr + " : in model " + vModelStr);
			throw pErr;
		}*/
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