@@ -0,0 +1,46 @@
/// <reference path="idsp.dao.ts" />

import {MySql} from '../services/mysql.service';
import {User} from '../../models/user.model';

export class UserDAO implements DAO.DAO<User>{
	private table_name:string = 'vr_master_user';
	private _mysql:MySql;

	constructor(){
	}

	async create(user:User):Promise<User>{
		this._mysql = new MySql();
		const query:string = "insert into "+this.table_name+" (username,password) values('"+user.username+"','"+user.password+"')";
		var resp:string =  await this._mysql.executeQuery(query);
		return user;
    }

    async login(username:string,password:string):Promise<User>{
    	this._mysql = new MySql();
    	const query:string = "select * from " + this.table_name + " where username = '"+username+"' and password = '"+password+"'";
    	var resp:string = await this._mysql.executeQuery(query);
    	let user:User = JSON.parse(JSON.stringify(resp));
    	return user;
    }

	/*async create(user:User):Promise<User> {
		const query:string = "insert into "+this.table_name+" values('"+user.username+"','"+user.password+"')";
		console.log(query);
		//var resp:string =  await this._mysql.executeQuery(query);
        return user;
    }*/

    async read(id:number):Promise<User> {
       	
    }

    async update(user:User):Promise<boolean> {
        return false;
    }

    async delete(id:number):Promise<boolean> {
        return false;
    }
}
\ No newline at end of file