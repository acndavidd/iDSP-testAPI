'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const api_service_1 = require('../../../services/api.service');
const error_handling_service_1 = require('../../../services/error-handling.service');
const data_access_service_1 = require('../../../services/data-access.service');
const balance_model_1 = require('../../../models/input/retailer/balance.model');
const dropsize_model_1 = require('../../../models/input/retailer/dropsize.model');
class LoadTransferController {
    constructor() {
        LoadTransferController._dataAccess = new data_access_service_1.DataAccessService();
        LoadTransferController._errorHandling = new error_handling_service_1.ErrorHandlingService();
        LoadTransferController._httpService = new api_service_1.APIService.HTTPService();
    }
    getSuggestedOrder(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('In getSuggestedOrder controller');
                var vMonth = new Date().getMonth();
                if (pRequest.query.subcat_type === 'L') {
                    let vData = new dropsize_model_1.DropsizeModel(pRequest.query.brand, vMonth, pRequest.params.id, pRequest.query.subcat_type);
                    var vSuggestedOrder = yield LoadTransferController._dataAccess.getDropSize('get_bcp_dropsize', vData.paramLoad);
                    console.log('Result : ' + vSuggestedOrder);
                    pResponse.status(200).json(vSuggestedOrder);
                }
                else {
                    console.log('P');
                }
            }
            catch (pErr) {
                JSON.stringify(pErr);
                LoadTransferController._errorHandling.throwError(400, 'Failed to get suggested order', pErr);
            }
        });
    }
    getCurrentBalance(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('in getCurrentBalance controller');
                let vPath = '/elpnet/services/idsp/retailerbalance';
                let vParams = new balance_model_1.BalanceModel(pRequest.body.min, pRequest.body.source);
                let vResult = yield LoadTransferController._httpService.post(api_service_1.APIService.APIType.ELP, vPath, null, vParams);
                pResponse.status(200).json(vResult);
            }
            catch (pErr) {
                LoadTransferController._errorHandling.throwError(400, 'Failed to get balance from ELP', pErr);
            }
        });
    }
}
exports.LoadTransferController = LoadTransferController;
//# sourceMappingURL=load-transfer.controller.js.map