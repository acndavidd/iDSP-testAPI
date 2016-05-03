'use strict';

import {TokenService} from '../services/token.service';
import {ORMService} from '../services/orm.service';

export class LoginController{
	
	constructor(){
	}

	doLogin(req:string,res:string){
		try{
			let tokenSvc = new TokenService();
			var tokenobj = {
				user : {
					name : req.body.username,
					password : req.body.password
				}
			};
			var result = {
				success : 1
				token : tokenSvc.generateToken(tokenobj)
			};
			res.cookie('accessToken',result.token,{httpOnly:true});
		}catch(err){
			var result = {
				success : 0
			};
		}
		res.json(result);
	}

	doLogout(req:string,res:string){
		try{
			req.session.destroy(function(err){
				if(err)throw err;
				var result = {
					success : 1
				}
			});
		}catch(err){
			var result = {
				success : 0,
				error   : err
			}
		}
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