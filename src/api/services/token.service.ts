var vPath = require("path");
var vEnv = process.env.NODE_ENV || "development";
var vConfig = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
var vUuid = require('uuid');
var vNJwt = require('njwt');

export class TokenService{

	generateToken(pObj?:any):string{
		var vSigningkey = vConfig.service.key;
		var vClaims = [];
		vClaims.push(pObj);
		var vJwt = vNJwt.create(pObj,vSigningkey);
		var vToken = vJwt.compact();
		return vToken;
	}

	verifyToken(pToken:string){
		try{
			return vNJwt.verify(pToken,vConfig.service.key);
		}catch(pErr){
			throw pErr;
		}
	}
}