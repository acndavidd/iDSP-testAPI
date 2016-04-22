'use strict';

import {MySql} from '../services/mysql.service';

export class LoginController{
	constructor(){
	}
	
	async postLogin(req:string,res:string){
		const _mysql:MySql = new MySql();
		var resp:string =  await _mysql.executeQuery('select * from vr_config');
		res.json(resp);
	}
}