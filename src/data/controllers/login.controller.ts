'use strict';

import {MySql} from '../services/mysql.service';
import {UserDAO} from '../daos/user.dao';
import {User} from '../../models/user.model';

export class LoginController{
	private _userDAO:UserDAO;
	
	constructor(){}
	
	async postLogin(req:string,res:string){
		let _userDAO = new UserDAO();
		let user:User = await _userDAO.login(req.username,req.password);
		res.json(user);
	}
}