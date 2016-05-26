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

	async accountsReceivables(pRequest, pResponse) {
		try{
			console.log('in accountsReceivables API');
			let vOrmSvc = new ORMService();
			var vDspId = pRequest.body.vDspId;
			var vDate = pRequest.body.vDate;

			let vParams = {
				dsp_id : vDspId,
				route_day : vDate
			};

			var vResult = await vOrmSvc.sp( 'account_receivables', vParams );
			var vResponse = {
				"status" : "200",
				"errorMessage" : "Success",
				"result" : vResult
			};
			console.log( "account_receivables response : " + JSON.stringify( vResponse ) );
			pResponse.json(vResponse);

		} catch(pErr) {
			var vError = {
					"status" : "100",
					"errorMessage" : pErr,
					"result" : null
				};
			console.log( "Error in get_account_receivables : " + vError);
			pResponse.json(vError);
		}
	}

	async retailerSelf(pRequest, pResponse) {
		try {
			console.log('in retailerSelf API');
			var source = pRequest.body.vSource;
			var username = pRequest.body.vDspId;
			let vHttpSvc = new APIService.HTTPService();
			let vPath:string = '/OPISNET/services/idsp/SELFTransactions?source=' + source + '&username=' + username;
			var vResult = JSON.parse(await vHttpSvc.get(APIService.APIType.OPISNET, vPath, null));

			pResponse.json(vResult);
			console.log( "retailerSelf response : " + JSON.stringify( pResponse ) );
		} catch (pErr){
			var vError = {
					"status" : "100",
					"errorMessage" : pErr,
					"result" : null
			};
			console.log( "Error in retailerSelf : " + vError);
			pResponse.json(vError);
		}
	}
}