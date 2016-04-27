'use strict';

import {TokenService} from '../services/token.service';
import {MySql} from '../services/mysql.service';
import {UserDAO} from '../daos/user.dao';
import {User} from '../../models/user.model';

export class LoginController{
	private _userDAO:UserDAO;
	
	constructor(){}
	
	async postLogin(req:string,res:string){
		let _userDAO = new UserDAO();
		let user:User = await _userDAO.login(req.body.username,req.body.password);
		let _tokensvc = new TokenService();
		let token:string = _tokensvc.generateToken(user);
		res.cookie('accessToken',token,{httpOnly:true});
		//console.log(token);
		res.json(user);
	}
}