'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const api_service_1 = require('../services/api.service');
const error_handling_service_1 = require('../services/error-handling.service');
const data_access_service_1 = require('../services/data-access.service');
class RemittanceController {
    constructor() {
        RemittanceController._dataAccess = new data_access_service_1.DataAccessService();
        RemittanceController._errorHandling = new error_handling_service_1.ErrorHandlingService();
        RemittanceController._httpService = new api_service_1.APIService.HTTPService();
    }
    getRemittancesDetail(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Start getting remittances detail");
            try {
                var vDSPID = pRequest.params.dspid;
                let vParams = {
                    dsp_id: vDSPID
                };
                var vResult = yield RemittanceController._dataAccess.executeSP('get_remittances_detail', vParams, false);
                console.log("Query Done with result : " + JSON.stringify(vResult));
                pResponse.json(vResult);
            }
            catch (pErr) {
                console.log("Failed to Query getting remittances detail with error message :" + pErr);
                var vError = {
                    "status": "Error",
                    "errorType": "Internal Exception",
                    "errorCode": "ERR_INTERNAL_SYSTEM",
                    "result": pErr
                };
                pResponse.json(vError);
            }
            console.log("End getting remittances detail");
        });
    }
}
exports.RemittanceController = RemittanceController;
//# sourceMappingURL=remittance.controller.js.map