var vPath = require("path");
var vEnv = process.env.NODE_ENV || "development";
var vConfig = require(vPath.join(__dirname, '..', 'config', 'config.json'))[vEnv];
var vSequelize = require("sequelize");
var vFs = require('fs');
var vToday = Date.now();
var vDate = new Date(vToday);
var vDebugFile = vPath.join(__dirname,'..','debug', vDate.getDate() + '-' + (vDate.getMonth()+1) + '-' + vDate.getFullYear() + '.debug.js');
var vDebugFD;

export interface SequelizeInterface {
	getInstance(): any;
	getModelPath(): string;
	getModelNaming(): string; 
}

export class SequelizeService implements SequelizeInterface{
	private vSeqInstance;
	private vNaming;
	private vModelPath;
	constructor(){
		this.vNaming = vConfig.model.naming;
		this.vModelPath = vPath.join(__dirname,'..',vConfig.model.dir);
		try{
			this.vSeqInstance = new vSequelize(
				vConfig.db.name, 
				vConfig.db.username, 
				vConfig.db.password,
				{
					dialect : vConfig.db.dialect,
					host    : vConfig.db.host,
					port	: vConfig.db.port,
					timezone : vConfig.db.timezone,
					logging : (vEnv === 'development') ? function(pLog){
						vDebugFD = vFs.openSync(vDebugFile, 'a');
						vDate = new Date(Date.now());
						vFs.writeSync(vDebugFD,vDate.getHours()+':'+vDate.getMinutes()+':'+vDate.getSeconds() + ' - '+ pLog+'\n');
        				vFs.closeSync(vDebugFD);
					} : false
				});
		}catch(err){
			console.log(err);
			throw err;
		}
	}

	getInstance(){return this.vSeqInstance;}

	getModelPath(){return this.vModelPath;}

	getModelNaming(){return this.vNaming;}
}