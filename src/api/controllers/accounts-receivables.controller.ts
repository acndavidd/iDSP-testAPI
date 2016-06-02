'use strict';

import {TokenService} from '../services/token.service';
import {ORMService} from '../services/orm.service';
import {APIService} from '../services/api.service';
import {AccModel} from '../models/input/account-receivables.model';

export interface AccInterface {
	accountsReceivables(pRequest, pResponse): Promise<void>;
}

export class AccController {
	constructor() { 		
	}

	async accountsReceivables(pRequest, pResponse) {
		try {
			let vOrmSvc = new ORMService();
			let vRouteDay = new Date().getDay();
			let vHttpSvc = new APIService.HTTPService();
			let vPath:string = '/OPISNET/services/idsp/SELFTransactions';
			var vResultAll:any = [];
			var vResultBcp:any = [];
			var vResultSelf: any = [];
			var vTempAll: any = [];
			var vAPISelfList: any = [];

			try {
			//Start calling OPIS+ API
				let vAccData = new AccModel(pRequest.query.username, vRouteDay, pRequest.query.source, null, null, null, null);
				var vResultTmpSelf = await vHttpSvc.get(APIService.APIType.OPISNET, vPath, null, vAccData.ParamOpis);
				vAPISelfList = vResultTmpSelf.payload.SELFTransactionList;
			} catch (pErr) {
				var vError = {
					'errorCode' : 102,
					'errorMessage' : 'Error in calling API SELF service'
				};
				console.log(pErr);
				throw vError;
			}

			try {
				// console.log('Start Calling SP BCP');
				let vDataBcp = new AccModel(pRequest.query.username, vRouteDay, 'BCP', null, null, null, null);
				var vResultTmpBcp = await vOrmSvc.sp('account_receivables_bcp', vDataBcp.ParamSpBcp, false);
				vResultBcp = vResultTmpBcp.payload[0].v_receivables_bcp;
				vRouteDay = 1;
				var vDataSelfList = [];
				for (var j = 0; j < vAPISelfList.length; j++) {
				let vDataSelf = new AccModel(pRequest.query.username, vRouteDay, 'SELF', vAPISelfList[j].RetailerID, vAPISelfList[j].RetailerName, vAPISelfList[j].RetailerMIN, vAPISelfList[j].totalAmount);
				vDataSelfList = vDataSelfList.concat(vDataSelf.ParamSpSelf);
				}
				var vResultTmpSelf = await vOrmSvc.sp('account_receivables_self', vDataSelfList, true);
				// vResultSelf = vResultTmpSelf.payload;
				for (var u = 0; u < vResultTmpSelf.payload.length; u++) {
					vResultSelf = vResultSelf.concat(vResultTmpSelf.payload[u].v_receivables_self);
				}
			} catch(pErr) {
				var vError = {
					'errorCode' : 101,
					'errorMessage' : 'Error in calling BCP service'
				};
				throw vError;
			}

			vResultAll.push(vResultBcp.concat(vResultSelf));	
			pResponse.status(vResultTmpBcp.status).json(vResultAll[0].sort(function(a, b) {
				if (a.sequence === null && b.sequence === null) {
					return 0;
				}
				if (a.sequence === null) {
					return 1;
				}
				if (b.sequence === null) {
					return -1;
				}
				if (parseInt(a.sequence) > parseInt(b.sequence)) {
					return 1;
				}
				if (parseInt(a.sequence) < parseInt(b.sequence)) {
					return -1;
				} else {
					return 0;
				}
			}));

		} catch(pErr) {
			var vError = {
					'errorCode' : 100,
					'errorMessage' : 'Error in calling API service : ' + pErr
				};
			throw pResponse.json(vError);
		}
	}
}