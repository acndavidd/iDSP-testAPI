'use strict';

import {TokenService} from '../services/token.service';
import {ORMService} from '../services/orm.service';
import {APIService} from '../services/api.service';

export interface AccInterface {
	accountsReceivables(pRequest, pResponse): Promise<void>;
	retailerSelf(pRequest, pResponse): Promise<void>;
}

export class AccController {

	constructor() { 		
	}

	// async accountsReceivables(pRequest, pResponse) {
	// 	try{
	// 		console.log('in accountsReceivables API');
	// 		let vOrmSvc = new ORMService();
	// 		var vDspId = pRequest.query.account;
	// 		var vSource = pRequest.query.source;
	// 		var vDate = new Date().getDay();

	// 		let vParams = {
	// 			dsp_id : vDspId,
	// 			source : vSource,
	// 			route_day : vDate
	// 		};

	// 		var vResult = await vOrmSvc.sp( 'account_receivables', vParams );
	// 		var vResponse = {
	// 			"status" : "200",
	// 			"errorMessage" : "Success",
	// 			"result" : vResult
	// 		};
	// 		console.log( "account_receivables response : " + JSON.stringify( vResponse ) );
	// 		pResponse.json(vResponse);

	// 	} catch(pErr) {
	// 		var vError = {
	// 				"status" : "100",
	// 				"errorMessage" : pErr,
	// 				"result" : null
	// 			};
	// 		console.log( "Error in get_account_receivables : " + vError);
	// 		pResponse.json(vError);
	// 	}
	// }
	async accountsReceivables(pRequest, pResponse) {
		try {
			console.log('in accountsReceivables API');
			let vOrmSvc = new ORMService();
			var vUsername = pRequest.query.username;
			var vSource = pRequest.query.source;
			var vDate = new Date().getDay();
			let vHttpSvc = new APIService.HTTPService();
			let vPath:string = '/OPISNET/services/idsp/SELFTransactions?source=iDSP&username=' + vUsername;

			let vParams = {
				dsp_id : vUsername,
				source : vSource,
				route_day : vDate
			};

			var vResultBcp = await vOrmSvc.sp( 'account_receivables', vParams );
			var vResultSelf = JSON.parse(await vHttpSvc.get(APIService.APIType.OPISNET, vPath, null));
			vResultSelf.push({"source" : "SELF"});
			var vResponse = {
				"status" : "200",
				"errorMessage" : "Success",
				"result" : vResultBcp.concat(vResultSelf)
			};
			console.log('Response API: ' + JSON.stringify(vResponse));
			pResponse.json(vResponse);

		} catch(pErr) {
			var vError = {
					"status" : "100",
					"errorMessage" : pErr,
					"result" : null
				};
			console.log( "Error in 	get_account_receivables : " + JSON.stringify(vError));
			throw pResponse.json(vError);
		}
	}

	// async retailerSelf(pRequest, pResponse) {
	// 	try {
	// 		console.log('in retailerSelf API');
	// 		var vSource = pRequest.body.vSource;
	// 		var vUsername = pRequest.body.vDspId;
	// 		let vHttpSvc = new APIService.HTTPService();
	// 		let vPath:string = '/OPISNET/services/idsp/SELFTransactions?source=' + vSource + '&username=' + vUsername;
	// 		var vResult = JSON.parse(await vHttpSvc.get(APIService.APIType.OPISNET, vPath, null));

	// 		pResponse.json(vResult);
	// 		console.log( "retailerSelf response : " + JSON.stringify( pResponse ) );
	// 	} catch (pErr){
	// 		var vError = {
	// 				"status" : "100",
	// 				"errorMessage" : pErr,
	// 				"result" : null
	// 		};
	// 		console.log( "Error in retailerSelf : " + vError);
	// 		pResponse.json(vError);
	// 	}
	// }
}