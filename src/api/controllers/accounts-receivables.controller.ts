'use strict';

import {TokenService} from '../services/token.service';
import {ORMService} from '../services/orm.service';

export class AccController{
	

	constructor(
		){ 
		
	}

	getAllRetailer(pRequest,pResponse){
		console.log("masukk sini coy");
		var vResult;
		var _vORMService:ORMService = new ORMService();
		try{
			
			console.log('masuk try');
			var vAccReceivables = _vORMService.getModel("trx_account_receivable");
			console.log('masuk try 2');
			vAccReceivables.findAll({
				attributes: ['order_id','retailer_id']
			});
			console.log('Dapet acc : '+vAccReceivables);
			vResult = vAccReceivables;
		}catch(err){
			vResult = {
				status : "ERROR",
				statusMessage : "GAGAL BRO",
				productList : {
				}
			};
		}
		pResponse.json(vResult);
	}
}