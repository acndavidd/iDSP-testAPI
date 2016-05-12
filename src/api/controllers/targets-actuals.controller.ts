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
		  attributes: ['brand'], 
   			group: ['brand']
		}).then(function(result){

			console.log(result);

			var vResult = {
				"status" : "Success",
				"statusMessage" : "",
				"error":"error",
				"brandList" : result

			}
			pResponse.json(vResult);

		}).catch(function (err) {
		        pResponse.send("Failed to Insert" + ' Time :' + new Date().toLocaleString() + " Error : " + err);
			});
		}
		catch(pErr){
			console.log(pErr);
		}
	}
}
