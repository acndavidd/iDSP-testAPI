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
		var vPromises = [];
		var vResult:any = [];
		try{
			
			console.log('masuk try');
			var vAccReceivables = _vORMService.getModel("trx_account_receivable");
			console.log('masuk try 2');
			var promise = vAccReceivables.findAll().then(function(res){
				vResult.push(res);
			});
			vPromises.push(promise);
			Promise.all(vPromises).then(function(){
				console.log('finished '+vResult);
				pResponse.json(vResult);
			});
			
		//	vResult = vAccReceivables;
		}catch(err){
			vResult = {
				status : "ERROR",
				statusMessage : "GAGAL BRO",
				productList : {
				}
			};
			console.log(err);
		}
		//pResponse.json(vResult);
	}
}