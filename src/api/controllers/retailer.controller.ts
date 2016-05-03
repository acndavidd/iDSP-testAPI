'use strict';

const orm_service = require('../services/orm.service');

export class RetailerController{
	
	constructor(){
	}

	queryCallPlan(req:string,res:string){

		var message = 'Query users start.';
		var vId = req.param('id');

		var users = orm_service.model('public.users');        
   
		users.findOne({
	       	where: {
	         id: vId
	       	}
	    }).then(function(result) {
	         console.log(result); 
	         if(result === null)
	         {
	             throw " NO Data Found";
	         }
	         else
	         {            
	             res.json(result);
	         }
	     }).catch(function(error) {
	         console.log("Gagal Query users"+ error);
	         res.json(result);
	         res.send("Failed to Query" + ' Time :' + new Date().toLocaleString() + " Error : " + error);
	     });  		
	}
}