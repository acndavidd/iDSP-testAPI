'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
// initial
const data_access_service_1 = require('../../../services/data-access.service');
const api_service_1 = require('../../../services/api.service');
const error_handling_service_1 = require('../../../services/error-handling.service');
// import your model here
const account_receivables_model_1 = require('../../../models/input/account-receivables.model');
const retailer_model_1 = require('../../../models/input/retailer/retailer.model');
class AccountReceivableController {
    constructor() {
        AccountReceivableController._dataAccessService = new data_access_service_1.DataAccessService(),
            AccountReceivableController._httpService = new api_service_1.APIService.HTTPService(),
            AccountReceivableController._errorHandling = new error_handling_service_1.ErrorHandlingService();
    }
    getAccountReceivable(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let vRouteDay = new Date().getDay();
                var vResultAll = [];
                var vResultBcp = [];
                var vResultSelf = [];
                var vTempAll = [];
                var vAPISelfList = [];
                var vSelfTotalAmount;
                var vBcpTotalAmount;
                var vRouteSelfAmount;
                var vRouteBcpAmount;
                try {
                    // Start calling OPIS+ API
                    console.log('in retailer controller: start calling OPIS+ API');
                    let vAccData = new account_receivables_model_1.AccountReceivableModel(pRequest.query.username, vRouteDay, null, null, "1", "1", null, 1, 9);
                    let vPath = '/opisnet/services/idsp/selftransactionsummary';
                    var vResultTmpSelf = yield AccountReceivableController._httpService.get(api_service_1.APIService.APIType.OPISNET, vPath, null, vAccData.ParamOpis);
                    vAPISelfList = vResultTmpSelf.selfTransactionList;
                }
                catch (pErr) {
                    var vError = {
                        'errorCode': 102,
                        'errorMessage': 'Error in calling API SELF service'
                    };
                    console.log(pErr);
                    vAPISelfList = [];
                }
                try {
                    // console.log('Start Calling SP BCP');
                    console.log('in retailer controller: start calling SP BCP');
                    let vDataBcp = new account_receivables_model_1.AccountReceivableModel(pRequest.query.username, vRouteDay, 'BCP', null, null, null, null, null, null);
                    let vParamsBcp = {
                        'spName': 'account_receivables_bcp',
                        'spData': vDataBcp.ParamSpBcp,
                        'isJson': false
                    };
                    // var vResultTmpBcp = await vOrmSvc.sp('account_receivables_bcp', vDataBcp.ParamSpBcp, false);
                    var vResultTmpBcp = yield AccountReceivableController._dataAccessService.getAccountReceivable(vParamsBcp);
                    // console.log('vResultTmpBcp : ' + JSON.stringify(vResultTmpBcp));
                    vResultBcp = vResultTmpBcp[0].v_receivables_bcp;
                    vRouteDay = 1;
                    var vDataSelfList = [];
                    for (var j = 0; j < vAPISelfList.length; j++) {
                        let vDataSelf = new account_receivables_model_1.AccountReceivableModel(pRequest.query.username, vRouteDay, 'SELF', vAPISelfList[j].retailerID, vAPISelfList[j].retailerName, vAPISelfList[j].retailerMIN, vAPISelfList[j].totalAmount, null, null);
                        vDataSelfList = vDataSelfList.concat(vDataSelf.ParamSpSelf);
                    }
                    let vParamsSelf = {
                        'spName': 'account_receivables_self',
                        'spData': vDataSelfList,
                        'isJson': true
                    };
                    // var vResultTmpSelf = await vOrmSvc.sp('account_receivables_self', vDataSelfList, true);
                    var vResultTmpSelf = yield AccountReceivableController._dataAccessService.getAccountReceivable(vParamsSelf);
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
                    var vTotalReceivable = { 'total_receivable_amount': (vSelfTotalAmount + vBcpTotalAmount) };
                    var vInRouteReceivable = { 'total_inroute_amount': (vRouteSelfAmount + vRouteBcpAmount) };
                }
                catch (pErr) {
                    var vError = {
                        'errorCode': 101,
                        'errorMessage': 'Error in calling BCP service'
                    };
                    throw vError;
                }
                // Concat the result from OPIS+ and Postgres
                vResultAll.push(vResultBcp.concat(vResultSelf));
                vResultAll.push(vTotalReceivable, vInRouteReceivable);
                // console.log('vResultAll : ' + JSON.stringify(vResultAll));
                pResponse.status(200).json(vResultAll);
            }
            catch (pErr) {
                // var vError = {
                // 		'errorCode' : 100,
                // 		'errorMessage' : 'Error in calling API service : ' + pErr
                // 	};
                // throw pResponse.json(vError);
                AccountReceivableController._errorHandling.throwError(400, 'Error in calling API Service', pErr);
            }
        });
    }
    getRetailerMins(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log('in controller');
            let vPath = '/opisnet/services/idsp/rtmins';
            let vRetailerModel = new retailer_model_1.RetailerInputModel('DSP00001', pRequest.params.id, 1, 4);
            // console.log('12312312 : ' + vRetailerModel);
            try {
                var vResult = yield AccountReceivableController._httpService.get(api_service_1.APIService.APIType.OPISNET, vPath, null, vRetailerModel);
                pResponse.status(200).json(vResult.retailerMINList);
            }
            catch (pErr) {
                AccountReceivableController._errorHandling.throwError(400, 'Error in calling API Service', pErr);
            }
        });
    }
}
exports.AccountReceivableController = AccountReceivableController;
//# sourceMappingURL=account-receivable.controller.js.map