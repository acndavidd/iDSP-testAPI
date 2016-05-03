var vFs        = require("fs");
var vPath = require("path");
var vEnv = process.env.NODE_ENV || "development";
var vConfig = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
var vSequelize = require("sequelize");
export class ORMService{
	constructor(){
		
	}

	public initialize(){
		var vSequelize = new Sequelize(vConfig.db.database, config.username, config.password, config);
		vFs.readdirSync(path.join(__dirname,'..','model')
			.filter(function(file) {
    			return (file.indexOf(".") !== 0) && (file !== "index.js");
  			})
 			.forEach(function(file) {
 				console.log(file);
    			//var model = sequelize.import(path.join(__dirname, file));
    			//db[model.name] = model;
  			});
		//vSequelize = new Sequelize(vConfig.db.name);
	}
				
	public refreshModels(pRequest:string,pResponse:string){
		var proc = require('child_process').exec;
		var modelPath = req.body.path;
        var cmd = 'spgen -d '+config.db.name+' -u '+config.db.username+' -s '+config.db.schema+' -h '+config.db .host;
        if(config.db.password && config.db.password !== '')
        	cmd += ' -p ' + config.db.password;
        if(modelPath)cmd += ' -t ' + modelPath;
        proc(cmd,function(error, stdout, stderr){
            if(error){
            	res.send(error);
            }
            var response = stdout.replace(/\n/g,"<br/>");
            pRes.send(response);
        });
	}
}