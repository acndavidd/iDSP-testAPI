'use strict';

import {TokenService} from '../services/token.service';
import {ORMService} from '../services/orm.service';

export class LoginController{
	
	constructor(){
	}

	login(pRequest,pResponse){
		try{
			let vTokenSvc = new TokenService();
			var vTokenObj = {
				user : {
					name : pRequest.body.username,
					password : pRequest.body.password
				}
			};
			var vResult = {
				success : 1,
				token : vTokenSvc.generateToken(vTokenObj)
			};
			pResponse.cookie('accessToken',vResult.token,{httpOnly:true});
		}catch(err){
			var vResult = {
				success : 0,
				token   : ''
			};
		}
		pResponse.json(vResult);
	}
	logout(pRequest,pResponse){
		try{
			var message = 'Insert start.';
			console.log("mw Init");

			var orm = new ORMService();
			console.log("mw map mode");
			var sales_order_new = orm.getModel("trx_sales_order");
        	
        	console.log("mw Create");
		     sales_order_new.create({
		         dsp_id: 1,
		 	    retailer_id: 1,
		 	    total_amount: 1000000
		     }, {isNewRecord:true}
		     ).then(function(pResult){
		         console.log("Successfully insert"+ pResult.get("order_id"));

		         console.log("mw Create detail unserved order");
		         var sales_order_unserved = orm.getModel("trx_unserved_order");
			     sales_order_unserved.create({
			     	order_id:pResult.order_id,
			        product_id: 'ITEM_1',
			 	    quantity: 10,
			 	    remarks: 'YO MAMEN'
			     }, {isNewRecord:true}
			     ).then(function(pResult){
			         console.log("Successfully insert"+ pResult.get("order_id"));
				});
			});

		     
		}
		catch(pErr){
			console.log(pErr);
		}
	}
}