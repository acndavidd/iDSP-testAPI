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
			let vPath:string = '/OPISNET/services/idsp/SELFTransactionSummary';
			var vResultAll:any = [];
			var vResultBcp:any = [];
			var vResultSelf: any = [];
			var vTempAll: any = [];
			var vAPISelfList: any = [];
			var vSelfTotalAmount: number;
			var vBcpTotalAmount: number;
			var vRouteSelfAmount: number;
			var vRouteBcpAmount: number;

			try {
			//Start calling OPIS+ API
				let vAccData = new AccModel(pRequest.query.username, vRouteDay, null, null, "1", "1", null, 1, 9);
				var vResultTmpSelf = await vHttpSvc.get(APIService.APIType.OPISNET, vPath, null, vAccData.ParamOpis);
				vAPISelfList = vResultTmpSelf.payload.selfTransactionList;
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
				let vDataBcp = new AccModel(pRequest.query.username, vRouteDay, 'BCP', null, null, null, null, null, null);
				var vResultTmpBcp = await vOrmSvc.sp('account_receivables_bcp', vDataBcp.ParamSpBcp, false);
				vResultBcp = vResultTmpBcp.payload[0].v_receivables_bcp;
				vRouteDay = 1;
				var vDataSelfList = [];
				for (var j = 0; j < vAPISelfList.length; j++) {
					let vDataSelf = new AccModel(pRequest.query.username, vRouteDay, 'SELF', vAPISelfList[j].RetailerID, vAPISelfList[j].RetailerName, vAPISelfList[j].RetailerMIN, vAPISelfList[j].totalAmount, null, null);
					vDataSelfList = vDataSelfList.concat(vDataSelf.ParamSpSelf);
				}
				var vResultTmpSelf = await vOrmSvc.sp('account_receivables_self', vDataSelfList, true);
				// vResultSelf = vResultTmpSelf.payload;
				for (var u = 0; u < vResultTmpSelf.payload.length; u++) {
					vResultSelf = vResultSelf.concat(vResultTmpSelf.payload[u].v_receivables_self);
				}
				vSelfTotalAmount = parseInt(vResultTmpSelf.payload[0].self_total_amount);
				vBcpTotalAmount = parseInt(vResultBcp[0].bcp_total_amount);
				vRouteSelfAmount = parseInt(vResultTmpSelf.payload[0].self_route_amount);
				vRouteBcpAmount = parseInt(vResultBcp[0].bcp_route_total_amount);
				var vTotalReceivable = {'total_receivable_amount' : (vSelfTotalAmount+vBcpTotalAmount)};
				var vInRouteReceivable = {'total_inroute_amount' : (vRouteSelfAmount+vRouteBcpAmount)};
			} catch(pErr) {
				var vError = {
					'errorCode' : 101,
					'errorMessage' : 'Error in calling BCP service'
				};
				throw vError;
			}

			// Concat the result from OPIS+ and Postgres
			vResultAll.push(vResultBcp.concat(vResultSelf));
			vResultAll.push(vTotalReceivable,vInRouteReceivable);
			console.log(JSON.stringify(vResultAll));

			// Sorted Object by Route Number	
			pResponse.status(vResultTmpBcp.status).json(vResultAll);

		} catch(pErr) {
			var vError = {
					'errorCode' : 100,
					'errorMessage' : 'Error in calling API service : ' + pErr
				};
			throw pResponse.json(vError);
		}
	}
}