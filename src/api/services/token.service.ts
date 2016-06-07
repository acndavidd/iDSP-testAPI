import {ErrorHandlingService} from './error-handling.service';
import {TokenObject} from '../models/token.model';

var vPath = require("path");
var vEnv = process.env.NODE_ENV || "DEVELOPMENT";
var vConfig = require(vPath.join(__dirname, '..', 'config', 'config.json'))[vEnv];
var vNJwt = require('njwt');
var TOKEN_ERROR = 104;
export interface TokenInterface {
	encryptToken(pObject: any): string;
	decryptToken(pToken: string): TokenObject;
}

export class TokenService implements TokenInterface {

	private static _errorHandling: ErrorHandlingService;
	constructor() {
		TokenService._errorHandling = new ErrorHandlingService();
	}

	encryptToken(pObject: TokenObject): string{
		try{
			// load sign in key from config files
			let vSigningkey = vConfig.token.key;
			// encrypt token
			let vClaims = [];
			vClaims.push(pObject);
			var vJwt = vNJwt.create(pObject,vSigningkey);
			var vToken = vJwt.compact();
			return vToken;
		}catch(pErr) {
			TokenService._errorHandling.throwError(TOKEN_ERROR, pErr.toString()):
		}
	}

	decryptToken(pToken:string): TokenObject{
		try{
			// load sign in key from config files
			let vSigningkey = vConfig.token.key;
			return vNJwt.verify(pToken,vSigningkey);
		}catch(pErr){
			TokenService._errorHandling.throwError(TOKEN_ERROR, pErr.toString()):
		}
	}
}