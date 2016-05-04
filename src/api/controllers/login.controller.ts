'use strict';

import {TokenService} from '../services/token.service';
import {ORMService} from '../services/orm.service';

export class LoginController{
	
	constructor(){
	}

	doLogin(pReq:string,pRes:string){
		try{
			let vTokenSvc = new TokenService();
			var vTokenobj = {
				user : {
					name : pReq.body.username,
					password : pReq.body.password
				}
			};
			var vResult = {
				success : 1
				token : vTokenSvc.generateToken(vTokenobj)
			};
			pRes.cookie('accessToken',vResult.token,{httpOnly:true});
		}catch(pErr){
			var vResult = {
				success : 0
			};
		}
		pRes.json(vResult);
	}

	doLogout(pReq:string,pRes:string){
		try{
			pReq.session.destroy(function(pErr){
				if(pErr)throw pErr;
				var vResult = {
					success : 1
				}
			});
		}catch(pErr){
			var vResult = {
				success : 0,
				error   : pErr
			}
		}
		pRes.json(vResult);
	}

	verifyToken(pToken:string){
		let vTokenSvc = new TokenService();
		try{
			var vVerify = vTokenSvc.verifyToken(pToken);
			return vVerify;
		}catch(pErr){
			throw pErr;
		}
	}

	sp(pReq:string,Res:string){
		let vOrmSvc = new ORMService();
		var vUser = 'djoko';
		vOrmSvc.executeFunction('anjay',JSON.stringify(vUser));
	}
}