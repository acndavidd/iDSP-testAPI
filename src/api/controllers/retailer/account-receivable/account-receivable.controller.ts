'use strict';
// initial
import {DataAccessService} from '../../../services/data-access.service';
import {APIService} from '../../../services/api.service';
import {ErrorHandlingService} from '../../../services/error-handling.service';

// import your model here
import {AccountReceivableModel} from '../../../models/input/account-receivables.model';
import {RetailerOutputModel} from '../../../models/output/retailer.model';
import {RouteDayOutputModel} from '../../../models/output/route-day.model';
import {RetailerInputModel} from '../../../models/input/retailer/retailer.model';

//import {ErrHandlerService} from '../../services/err.handler.service';

export interface AccountReceivableInterface{
	getAccountReceivable(pRequest, pResponse): Promise<void>;
	getRetailerMins(pRequest, pResponse): Promise<void>;
}


export class AccountReceivableController implements AccountReceivableInterface {

	//private errService:ErrHandlerService = new ErrHandlerService();
	private vUsername: string;
	private static _errorHandling: ErrorHandlingService;
	private static _dataAccessService: DataAccessService;
	private static _httpService: APIService.HTTPService;

	constructor() {
		AccountReceivableController._dataAccessService = new DataAccessService(),
		AccountReceivableController._httpService = new APIService.HTTPService(),
		AccountReceivableController._errorHandling = new ErrorHandlingService();
	}
	
	async getAccountReceivable(pRequest, pResponse) {
		try {
			let vRouteDay = new Date().getDay();
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
				// Start calling OPIS+ API
				console.log('in retailer controller: start calling OPIS+ API');
				let vAccData = new AccountReceivableModel(pRequest.query.username, vRouteDay, null, null, "1", "1", null, 1, 9);
				let vPath:string = '/opisnet/services/idsp/selftransactionsummary';
				var vResultTmpSelf = await AccountReceivableController._httpService.get(APIService.APIType.OPISNET, vPath, null, vAccData.ParamOpis);
				vAPISelfList = vResultTmpSelf.selfTransactionList;
				// console.log('vAPISelfList : ' + JSON.stringify(vAPISelfList));
			} catch (pErr) {
				var vError = {
					'errorCode' : 102,
					'errorMessage' : 'Error in calling API SELF service'
				};
				console.log(pErr);
				vAPISelfList = [];
			}

			try {
				// console.log('Start Calling SP BCP');
				console.log('in retailer controller: start calling SP BCP');
				let vDataBcp = new AccountReceivableModel(pRequest.query.username, vRouteDay, 'BCP', null, null, null, null, null, null);
				let vParamsBcp = {
					'spName' : 'account_receivables_bcp',
					'spData' : vDataBcp.ParamSpBcp,
					'isJson' : false
				};
				// var vResultTmpBcp = await vOrmSvc.sp('account_receivables_bcp', vDataBcp.ParamSpBcp, false);
				var vResultTmpBcp:any = await AccountReceivableController._dataAccessService.getAccountReceivable(vParamsBcp);
				// console.log('vResultTmpBcp : ' + JSON.stringify(vResultTmpBcp));
				vResultBcp = vResultTmpBcp[0].v_receivables_bcp;
				vRouteDay = 1;
				var vDataSelfList = [];
				for (var j = 0; j < vAPISelfList.length; j++) {
					let vDataSelf = new AccountReceivableModel(pRequest.query.username, vRouteDay, 'SELF', vAPISelfList[j].retailerID, vAPISelfList[j].retailerName, vAPISelfList[j].retailerMIN, vAPISelfList[j].totalAmount, null, null);
					vDataSelfList = vDataSelfList.concat(vDataSelf.ParamSpSelf);
				}
				let vParamsSelf = {
					'spName' : 'account_receivables_self',
					'spData' : vDataSelfList,
					'isJson' : true
				};
				// var vResultTmpSelf = await vOrmSvc.sp('account_receivables_self', vDataSelfList, true);
				var vResultTmpSelf:any = await AccountReceivableController._dataAccessService.getAccountReceivable(vParamsSelf);
				// console.log('vDataSelfList : ' + JSON.stringify(vDataSelfList));
				// console.log('vResultTmpSelf : ' + JSON.stringify(vResultTmpSelf));
				// vResultSelf = vResultTmpSelf.payload;
				for (var u = 0; u < vResultTmpSelf.length; u++) {
					vResultSelf = vResultSelf.concat(vResultTmpSelf[u].v_receivables_self);
				}
				console.log('vResultSelf : ' + JSON.stringify(vResultSelf));
				vSelfTotalAmount = parseInt(vResultTmpSelf[0].self_total_amount);
				vBcpTotalAmount = parseInt(vResultBcp[0].bcp_total_amount);
				vRouteSelfAmount = parseInt(vResultTmpSelf[0].self_route_amount);
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
			// console.log('vResultAll : ' + JSON.stringify(vResultAll));
			pResponse.status(200).json(vResultAll);
		} catch(pErr) {
			// var vError = {
			// 		'errorCode' : 100,
			// 		'errorMessage' : 'Error in calling API service : ' + pErr
			// 	};
			// throw pResponse.json(vError);
			AccountReceivableController._errorHandling.throwError(400, 'Error in calling API Service', pErr);
		}
	}

	async getRetailerMins(pRequest, pResponse) {
		console.log('in controller');
		let vPath:string = '/opisnet/services/idsp/rtmins';
		let vRetailerModel = new RetailerInputModel('DSP00001', pRequest.params.id, 1, 4);
		console.log('12312312 : ' + vRetailerModel);
		try {
			var vResult = await AccountReceivableController._httpService.get(APIService.APIType.OPISNET, vPath, null, vRetailerModel);
			pResponse.status(200).json(vResult.retailerMINList);
		}catch (pErr){
			AccountReceivableController._errorHandling.throwError(400, 'Error in calling API Service', pErr);
		}
	}
}