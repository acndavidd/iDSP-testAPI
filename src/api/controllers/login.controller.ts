'use strict';

import {TokenService} from '../services/token.service';

export class LoginController{
	
	constructor(){
	}

	doLogin(req:string,res:string){
		let tokenSvc = new TokenService();
		var result = {};
		result.token = tokenSvc.generateToken();
		res.cookie('accessToken',result.token,{httpOnly:true});
		res.json(result);
	}

	checkToken(req:string,res:string){
		res.json('calling checkToken ' + req.body.token);
	}
}