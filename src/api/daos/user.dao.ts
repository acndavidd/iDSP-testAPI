/// <reference path="idsp.dao.ts" />

import {MySql} from '../services/mysql.service';
import {User} from '../../models/user.model';

export class UserDAO implements DAO.DAO<User>{
	private table_name:string = 'vr_master_user';
	private _mysql:MySql;

	constructor(){
	}

    async login(username:string,password:string){
    	this._mysql = new MySql();
    	const query:string = "select * from " + this.table_name + " where username = '"+username+"' and password = '"+password+"'";
        var resp = await this._mysql.executeQuery(query);
    	let user:User = JSON.parse(JSON.stringify(resp));
    	return user;
    }
}