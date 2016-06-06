import {SequelizeService} from './sequelize.service';
import {ErrorHandling} from './error-handling.service';

var vPath = require("path");
var vFs = require('fs');
var vEnv = process.env.NODE_ENV || "development";
var vExec = require('child_process').spawn;
var vDebug = (vEnv === 'development') ? true : false;

export interface ORMInterface {
	sp(pSPName, pParams): Promise<any>;
	getSequelize(): any;
}

export class ORMService {
	private vModels;
	private vAssociatedModels;
	private vSequelizeSvc:SequelizeService;

	constructor(){
		this.vSequelizeSvc = new SequelizeService();
		/*
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
		if(vDebug)console.log('Finished loading association');*/
	}

	public async sp(pSPName:string,pParams:any,pIsJSON?:boolean) {
		let vSequelize = this.getSequelize();
		let vErrService:ErrorHandling.ErrorHandlingService = new ErrorHandling.ErrorHandlingService();
		let vCurrentContext = this;
		return new Promise<any>(
			function (pResolve,pReject){
				try{
					// build params
					let vParams;
					if(pIsJSON) {
						vParams = '(\''+JSON.stringify(pParams)+'\')';
					}else {
						vParams = '()';
						if (pParams) {
							vParams = '(';
							for(let vParam in pParams){
								vParams += "'" + pParams[vParam] + "',";
							}
							vParams = vParams.substring(0,vParams.lastIndexOf(',')) + ');';
						}
					}
					let vQuery = 'SELECT ' + pSPName + vParams;
					vSequelize.query( vQuery, { type: vSequelize.QueryTypes.SELECT }).then(function(pResults){
						try{
							pResolve(vErrService.processSPResult(pResults[0][pSPName.toLowerCase()]));
						}catch(pErr){
							pReject(pErr);
						}
					}).catch(function(pErr){
						pReject(vErrService.processSequelizeError(pErr.toString().replace('SequelizeDatabaseError: ', '')));
					});
				}catch(pErr){
					pReject(vErrService.processSequelizeError(pErr));
				}
			});
	}

	public getSequelize() {
		return this.vSequelizeSvc.getInstance();
	}

	public getModel(pModelName:string) {
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
}