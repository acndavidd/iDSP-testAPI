'use strict';

import {TokenService} from '../services/token.service';
import {ORMService} from '../services/orm.service';

export class LoginController{
	
	constructor(){
	}

	doLogin(req:string,res:string){
		let tokenSvc = new TokenService();
		var tokenobj = {
			user : {
				name : req.body.username,
				password : req.body.password
			},
			success : 1
		};
		var result = {
			token : tokenSvc.generateToken(tokenobj)
		};
		res.cookie('accessToken',result.token,{httpOnly:true});
		res.json(result);
	}

	verifyToken(token:string){
		let tokenSvc = new TokenService();
		try{
			var verify = tokenSvc.verifyToken(token);
			return verify;
		}catch(err){
			throw err;
		}
	}

	sp(req:string,res:string){
		let ormSvc = new ORMService();
		var user = 'djoko';
		ormSvc.executeFunction('anjay',JSON.stringify(user));
	}
}