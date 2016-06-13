'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const orm_service_1 = require('../services/orm.service');
const api_service_1 = require('../services/api.service');
const account_receivables_model_1 = require('../models/input/account-receivables.model');
class AccController {
    constructor() {
    }
    accountsReceivables(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let vOrmSvc = new orm_service_1.ORMService();
                let vRouteDay = new Date().getDay();
                let vHttpSvc = new api_service_1.APIService.HTTPService();
                let vPath = '/OPISNET/services/idsp/SELFTransactions';
                var vResultAll = [];
                var vResultBcp = [];
                var vResultSelf = [];
                var vTempAll = [];
                var vAPISelfList = [];
                try {
                    //Start calling OPIS+ API
                    let vAccData = new account_receivables_model_1.AccModel(pRequest.query.username, vRouteDay, pRequest.query.source, null, null, null, null);
                    var vResultTmpSelf = yield vHttpSvc.get(api_service_1.APIService.APIType.OPISNET, vPath, null, vAccData.ParamOpis);
                    vAPISelfList = vResultTmpSelf.payload.SELFTransactionList;
                }
                catch (pErr) {
                    var vError = {
                        'errorCode': 102,
                        'errorMessage': 'Error in calling API SELF service'
                    };
                    console.log(pErr);
                    throw vError;
                }
                try {
                    // console.log('Start Calling SP BCP');
                    let vDataBcp = new account_receivables_model_1.AccModel(pRequest.query.username, vRouteDay, 'BCP', null, null, null, null);
                    var vResultTmpBcp = yield vOrmSvc.sp('account_receivables_bcp', vDataBcp.ParamSpBcp, false);
                    vResultBcp = vResultTmpBcp.payload[0].v_receivables_bcp;
                    vRouteDay = 1;
                    var vDataSelfList = [];
                    for (var j = 0; j < vAPISelfList.length; j++) {
                        let vDataSelf = new account_receivables_model_1.AccModel(pRequest.query.username, vRouteDay, 'SELF', vAPISelfList[j].RetailerID, vAPISelfList[j].RetailerName, vAPISelfList[j].RetailerMIN, vAPISelfList[j].totalAmount);
                        vDataSelfList = vDataSelfList.concat(vDataSelf.ParamSpSelf);
                    }
                    var vResultTmpSelf = yield vOrmSvc.sp('account_receivables_self', vDataSelfList, true);
                    // vResultSelf = vResultTmpSelf.payload;
                    for (var u = 0; u < vResultTmpSelf.payload.length; u++) {
                        vResultSelf = vResultSelf.concat(vResultTmpSelf.payload[u].v_receivables_self);
                    }
                }
                catch (pErr) {
                    var vError = {
                        'errorCode': 101,
                        'errorMessage': 'Error in calling BCP service'
                    };
                    throw vError;
                }
                vResultAll.push(vResultBcp.concat(vResultSelf));
                pResponse.status(vResultTmpBcp.status).json(vResultAll[0].sort(function (a, b) {
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
                    }
                    else {
                        return 0;
                    }
                }));
            }
            catch (pErr) {
                var vError = {
                    'errorCode': 100,
                    'errorMessage': 'Error in calling API service : ' + pErr
                };
                throw pResponse.json(vError);
            }
        });
    }
}
exports.AccController = AccController;
//# sourceMappingURL=accounts-receivables.controller.js.map