'use strict';

import {TokenService} from '../services/token.service';
import {ORMService} from '../services/orm.service';

export class TargetsActualsController{


	constructor(){
	}
   
   getBrand(pRequest,pResponse){
	   try{

	   var message = 'Insert start.';
				console.log("mw Init");
	    var orm = new ORMService();
	    var product = orm.getModel("mst_product");	

	    product.findAll({
		 group: ['brand']
		}).then(function(result){

			console.log(result);
			pResponse.json(result);

		}).catch(function (err) {
		        // Transaction has been rolled back
		        // err is whatever rejected the promise chain returned to the transaction callback
		        //t.rollback();
		        pResponse.send("Failed to Insert" + ' Time :' + new Date().toLocaleString() + " Error : " + err);
			});
		}
		catch(pErr){
			console.log(pErr);
		}
	}
}
