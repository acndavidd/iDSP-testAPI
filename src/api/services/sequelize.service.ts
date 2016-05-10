var vPath = require("path");
var vEnv = process.env.NODE_ENV || "development";
var vConfig = require(vPath.join(__dirname, '..', 'config', 'config.json'))[vEnv];
var vSequelize = require("sequelize");

export class SequelizeService{
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