'use strict';

import {TokenService} from '../services/token.service';

export class LoginController{
	
	constructor(){
	}

	doLogin(req:string,res:string){
		let tokenSvc = new TokenService();
		var result = {};
		var tokenobj = {};
		tokenobj.user = {};
		tokenobj.user.name = req.body.username;
		tokenobj.user.password = req.body.password;
		result.token = tokenSvc.generateToken(tokenobj);
		res.cookie('accessToken',result.token,{httpOnly:true});
		res.json(result);
	}

	checkToken(req:string,res:string){
		res.json('calling checkToken ' + req.get('Authorization'));
	}
}