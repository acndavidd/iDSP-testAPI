var config = require('../config/config.json');
var path = require("path");
var env = process.env.NODE_ENV || "development";
var config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
var uuid = require('uuid');
var nJwt = require('njwt');

import {User} from '../../models/user.model';

export class TokenService{

	generateToken(obj?:any):string{
		var signingkey = config.service.key;
		var claims = [];
		claims.push(obj);
		var jwt = nJwt.create(obj,signingkey);
		console.log(jwt);
		var token = jwt.compact();
		return token;
	}

	verifyToken(token:string){
		try{
			return nJwt.verify(token,config.service.key);
		}catch(err){
			throw err;
		}
	}
}