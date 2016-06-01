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
			console.log('in accountsReceivables API');
			let vOrmSvc = new ORMService();
			let vRouteDay = new Date().getDay();
			let vAccData = new AccModel(pRequest.query.username, vRouteDay, pRequest.query.source);
			let vHttpSvc = new APIService.HTTPService();
			let vPath:string = '/OPISNET/services/idsp/SELFTransactions';
			var vResultBcpSelf:any = [];
			var vResultAll:any = [];
			var vSelfTotalAmount = 0;
			var vResultBcp:any = [];
			var vResultBcpSelf1: any = [];
			var vSelfAmount: any = [];
			var vRTemp: any = [];

			try {
			//Start calling Store Procedure
				var vResultTmpBcp = await vOrmSvc.sp('account_receivables', vAccData.ParamSp);
				vResultBcp = vResultTmpBcp.payload[0].v_receivables_all;
			} catch(pErr) {
				var vError = {
					'errorCode' : 101,
					'errorMessage' : 'Error in calling BCP service'
				};
				throw vError;
			}

			try {
			//Start calling OPIS+ API
				var vResultSelf = await vHttpSvc.get(APIService.APIType.OPISNET, vPath, null, vAccData.ParamOpis);
				var vList = vResultSelf.payload.SELFTransactionList;
				// var o = parseInt(vList.length);
				// console.log(vList.length);

				for (var i = 0; i < vList.length; i++) {
					let vData = [{
						"routeday" : 1,
						"retailer_id" : vList[i].RetailerID,
						"retailer_name " : vList[i].RetailerName,
						"retailer_min" : vList[i].RetailerMIN,
						"total_amount" : parseInt(vList[i].totalAmount)
					}];

					// console.log('isi vData : ' + JSON.stringify(vData));
					try {
						var vTempList = await vOrmSvc.sp('account_receivables_tes', vData[0]);
						// console.log('isi vTempList' + [i] + JSON.stringify(vTempList));
						if (vTempList.payload !== null) {
							// vSelfTotalAmount = (vSelfTotalAmount + vTempList.payload[0].amount);
							vResultBcpSelf.push(vTempList.payload);
						}
					} catch(err) {
						console.log('errorrrrr' + err);
					}
				}
				// console.log('length vResultBcpSelf : ' + vResultBcpSelf.length);
				for (var z = 0; z < vResultBcpSelf.length; z++) {
					vResultBcpSelf1 = vResultBcpSelf1.concat(vResultBcpSelf[z]);
				}
				// vResultBcpSelf1.push({"self_total_amount" : vSelfTotalAmount});
				
			} catch (pErr) {
				var vError = {
					'errorCode' : 102,
					'errorMessage' : 'Error in calling SELF service'
				};
				console.log(pErr);
				throw vError;
			}
			// console.log('length vResultBcp : ' + vResultBcp.length);
			// console.log('length vResultBcpSelf : ' + vResultBcpSelf.length);
			// console.log('length vResultBcpSelf1 : ' + vResultBcpSelf1.length);
			// console.log('isi vResultBcp : ' + JSON.stringify(vResultBcp));
			// console.log('isi vResultBcpSelf : ' + JSON.stringify(vResultBcpSelf));
			// console.log('isi vResultBcpSelf1 : ' + JSON.stringify(vResultBcpSelf1));

			for (var k=0; k < vResultBcp.length; k++) {
				if (vResultBcpSelf1[k] !== null) {
					vRTemp = vRTemp.concat(vResultBcpSelf1[k]);
				}
			}
			console.log('k : ' + JSON.stringify(vRTemp));
			vResultBcp = vResultBcp.concat(vRTemp);
			console.log('vResultBcp : ' + JSON.stringify(vResultBcp));
			
			// vResultAll.push(vResultBcpSelf1);
			// if (vResultBcpSelf.length > 0) {
			// 	vResultAll.concat(vResultBcpSelf);
			// }
			// console.log('length : ' + vResultBcpSelf.length);
			// for (var x = 0; x < vResultBcpSelf.length; x++) {
			// 		vResultAll.concat(vResultBcpSelf[x].concat({"self_total_amount" : vSelfTotalAmount}));
			// 	}
			// console.log('isi vresultbcpself 2: ' + JSON.stringify(vResultBcpSelf1));
			// for (var y = 0; y < vResultBcp.length; y++) {
			// 	console.log(JSON.stringify(vResultBcp[y]));
			// 	vResultBcp = vResultBcp[y].concat(vResultBcpSelf1[y]);
			// }

			vResultAll.push(vRTemp);
			// vResultAll.push(vResultBcpSelf1);
			// console.log('ALL : ' + JSON.stringify(vResultAll[0].sort()));		
			pResponse.status(vResultTmpBcp.status).json(vResultAll.sort());

		} catch(pErr) {
			var vError = {
					'errorCode' : 100,
					'errorMessage' : 'Error in calling API service : ' + pErr
				};
			throw pResponse.json(vError);
		}
	}
}