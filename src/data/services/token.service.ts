var config = require('../conf/config.js');
var jwt = require('jsonwebtoken');

import {User} from '../../models/user.model';

export class TokenService{
	generateToken(user:User):string{
		return jwt.sign(user,config.key,{expiresIn: 1440});
	}

	verifyToken(token:string):boolean{
		jwt.verify(token,config.key,function(err,decoded){
			if(err){
				console.log(err);
				return false;
			}else{
				console.log(decoded);
				return true;
			}
		});
		return true;
	}
}