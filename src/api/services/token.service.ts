var vPath = require("path");
var vEnv = process.env.NODE_ENV || "development";
var vConfig = require(vPath.join(__dirname, '..', 'config', 'config.json'))[vEnv];
//var vUuid = require('uuid');
var vNJwt = require('njwt');

export class TokenService{

	generateToken(pObj?:any):string{
		let vSigningkey = vConfig.token.key;
		let vClaims = [];
		vClaims.push(pObj);
		var vJwt = vNJwt.create(pObj,vSigningkey);
		var vToken = vJwt.compact();
		return vToken;
	}

	verifyToken(pToken:string){
		try{
			return vNJwt.verify(pToken,vConfig.token.key);
		}catch(pErr){
			throw pErr;
		}
	}
}