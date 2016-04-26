'use strict';

import {MySql} from '../services/mysql.service';
import {RetailerDAO} from '../daos/retailer.dao';
import {Retailer} from '../../models/retailer.model';

export class RetailerController{
	
	private _retailerDAO:RetailerDAO;
	constructor(){}
	
	async store(req:string,res:string){
		let _retailerDAO = new RetailerDAO();
		let retailer:Retailer = await _retailerDAO.store();
		res.json(retailer);
	}
}