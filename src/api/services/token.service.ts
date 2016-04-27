var config = require('../config/config.json');
var path = require("path");
var env = process.env.NODE_ENV || "development";
var config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
var uuid = require('uuid');
var nJwt = require('njwt');

import {User} from '../../models/user.model';

export class TokenService{

	generateToken():string{
		var signingkey = config.service.key;
		var claims = {
			role : 'admin'
		}
		var jwt = nJwt.create(claims,signingkey);
		var token = jwt.compact();
		return token;
	}

	async verifyToken(token:string):Promise<string>{
		/*return new Promise(function(resolve,reject){
			nJwt.verify(token,config.service.key,function(err,verifiedJwt){
				if(err){
					reject(err); // Token has expired, has been tampered with, etc
				}else{
					resolve(verifiedJwt);// Will contain the header and body
				}
			});
		});*/
		try{
			return nJwt.verify(token,config.service.key);
		}catch(err){
			throw err;
		}
	}
}