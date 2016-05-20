'use strict';

import {TokenService} from '../services/token.service';
import {ORMService} from '../services/orm.service';

export class AccController{
	

	constructor(){ 		
	}

	async getAccountsReceivables(pRequest, pResponse){
		try{
			console.log('in getAccountsReceivables API');
			let vOrmSvc = new ORMService();
			// let vAccModel = vOrmSvc.getModel('trx_sales_order');
			var vDspId = pRequest.body.vDspId;
			var vDate = pRequest.body.vDate;

			let vParams = {
				dsp_id : vDspId,
				route_day : vDate
			};

			var vResult = await vOrmSvc.sp( 'get_account_receivables', vParams );
			var vResponse = {
				"status" : "Success",
				"errorMessage" : "",
				"result" : vResult
			};
			console.log( "get_account_receivables response : " + JSON.stringify( vResponse ) );
			pResponse.json(vResponse);

			// vAccModel.findAll({
			// 	attributes : ['order_id'],
			// 	include : [{
			// 		model : vOrmSvc.getModel('trx_account_receivable'),
			// 		as : 'AccountReceivable',
			// 		required : true,
			// 		attributes : ['amount', 'dsp_id'],
			// 		where : {dsp_id : vDspId}, 
			// 		include :[{
			// 			model : vOrmSvc.getModel('mst_retailer'),
			// 			as : 'Retailer',
			// 			required : true,
			// 			attributes : ['retailer_name', 'retailer_min'],
			// 			include : [{
			// 				model : vOrmSvc.getModel('mst_route'),
			// 				as : 'Route',
			// 				attributes : ['route_id'],
			// 				include : [{
			// 					model : vOrmSvc.getModel('mst_route_day'),
			// 					as : 'RouteDay',
			// 					required : true,
			// 					where : { route_day : vDate},
			// 					attributes : ['sequence']
			// 				}]
			// 			}]
			// 		}]
			// 	}]
			// }).then(function(ret){
			// 	pResponse.json(ret);
			// });

		}catch(pErr){
			var vError = {
					"status" : "Error",
					"errorMessage" : pErr,
					"result" : null
				};
			console.log( "Error in get_account_receivables : " + vError);
			pResponse.json(vError);
		}
	}
}