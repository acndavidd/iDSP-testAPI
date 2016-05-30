'use strict';

import {TokenService} from '../services/token.service';
import {ORMService} from '../services/orm.service';

export interface TargetsActualsInterface{
	brand(pRequest,pResponse):void;
	targetsActuals(pRequest,pResponse):void;
}


export class TargetsActualsController implements TargetsActualsInterface{

    constructor(){}
   
    async brand(pRequest,pResponse){
	    try {	  
		    var message = 'Get brands start';

		    console.log("Start getting brands");
			var vOrmSvc = new ORMService();
			
			var vResult = await vOrmSvc.sp('get_brands', null);
			console.log("Query Brands with result : "+ JSON.stringify(vResponse));
			var vResponse = {
						"status" : "Success",
						"errorMessage" : "",
						"brandList" : vResult
					};
			
			pResponse.json(vResponse);
		}
		catch(pErr) {
			console.log("Failed to Query Payment History" + pErr);

			var vError = {
						"status" : "Error",
						"errorMessage" : pErr,
						"result" : null
					};
			pResponse.json(vError);
		}
	}

	async targetsActuals(pRequest,pResponse){
	   try{	  
		    var message = 'Insert start.';

		    console.log("Start targets actuals");
			var vSalesPerson = pRequest.body.salesPerson;
			var vSelectedType = pRequest.body.actualType;
			var vSelectedBrand = pRequest.body.brand;
			var vOrmSvc = new ORMService();

			let vParams = {
				sales_person : vSalesPerson,
				type : vSelectedType,
				brand : vSelectedBrand
			};

			var vResult = await vOrmSvc.sp('get_target_actuals', vParams );
			console.log("Query Done with result : "+ JSON.stringify(vResponse));
			var vResponse = {
						"status" : "Success",
						"errorMessage" : "",
						"result" : vResult
					};
			
			pResponse.json(vResponse);
		}
		catch(pErr)
		{
			console.log("Failed to Query Payment History" + pErr);

			var vError = {
						"status" : "Error",
						"errorMessage" : pErr,
						"result" : null
					};
			pResponse.json(vError);
		}
	}
}
