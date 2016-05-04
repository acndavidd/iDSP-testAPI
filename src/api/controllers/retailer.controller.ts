'use strict';

const ORM_SERVICE = require('../services/orm.service');

export class RetailerController{
	
	constructor(){
	}

	queryCallPlan(pReq,pRes){

		var vMessage = 'Query users start.';
		var vId = pReq.param('id');

		var vUsers = ORM_SERVICE.model('public.users');        
   
		vUsers.findOne({
	       	where: {
	         id: vId
	       	}
	    }).then(function(pResult) {
	         console.log(pResult); 
	         if(pResult === null)
	         {
	             throw " NO Data Found";
	         }
	         else
	         {            
	             pRes.json(pResult);
	         }
	     }).catch(function(pError) {
	         console.log("Gagal Query users"+ pError);
	         pRes.json(pError);
	         pRes.send("Failed to Query" + ' Time :' + new Date().toLocaleString() + " Error : " + pError);
	     });  		
	}
}