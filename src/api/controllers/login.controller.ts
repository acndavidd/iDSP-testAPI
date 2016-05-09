'use strict';

import {TokenService} from '../services/token.service';
import {ORMService} from '../services/orm.service';

export class LoginController{
	
	constructor(){
	}

	login(pRequest,pResponse){
		try{
			let vTokenSvc = new TokenService();
			var vTokenObj = {
				user : {
					name : pRequest.body.username,
					password : pRequest.body.password
				}
			};
			var vResult = {
				success : 1,
				token : vTokenSvc.generateToken(vTokenObj)
			};
			pResponse.cookie('accessToken',vResult.token,{httpOnly:true});
		}catch(err){
			var vResult = {
				success : 0,
				token   : ''
			};
		}
		pResponse.json(vResult);
	}
	logout(pRequest,pResponse){
		
	}
}