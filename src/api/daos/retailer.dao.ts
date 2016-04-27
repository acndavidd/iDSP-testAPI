/// <reference path="idsp.dao.ts" />

import {MySql} from '../services/mysql.service';
import {Retailer} from '../../models/retailer.model';

export class RetailerDAO implements DAO.DAO<Retailer>{
	private table_name:string = 'retailer';
	private _mysql:MySql;

	constructor(){
	}

    async store():Promise<Retailer>{
    	this._mysql = new MySql();
    	const query:string = "select * from " + this.table_name;
    	var resp:string = await this._mysql.executeQuery(query);
    	let Retailer:Retailer = JSON.parse(JSON.stringify(resp));
    	return Retailer;
    }


    async create(retailer:Retailer):Promise<Retailer>{
        return retailer;
    }

    /*async create(user:User):Promise<User> {
        const query:string = "insert into "+this.table_name+" values('"+user.username+"','"+user.password+"')";
        console.log(query);
        //var resp:string =  await this._mysql.executeQuery(query);
        return user;
    }*/

    async read(id:number):Promise<Retailer> {
           
    }

    async update(retailer:Retailer):Promise<boolean> {
        return false;
    }

    async delete(id:number):Promise<boolean> {
        return false;
    }
}