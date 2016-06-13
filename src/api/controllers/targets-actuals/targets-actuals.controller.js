'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const data_access_service_1 = require('../../services/data-access.service');
const api_service_1 = require('../../services/api.service');
const performance_model_1 = require('../../models/input/performance.model');
const error_handling_service_1 = require('../../services/error-handling.service');
class TargetsActualsController {
    constructor() {
        TargetsActualsController._dataAccess = new data_access_service_1.DataAccessService();
        TargetsActualsController._errorHandling = new error_handling_service_1.ErrorHandlingService();
        TargetsActualsController._httpService = new api_service_1.APIService.HTTPService();
    }
    brand(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Start getting Brands');
            try {
                var vParam = '';
                let vResult = yield TargetsActualsController._dataAccess.getBrands('get_brands', null);
                console.log('All Brand : ' + JSON.stringify(vResult));
                if (vResult) {
                    pResponse.json(vResult);
                }
                else {
                    console.log('BRAND NOT FOUND');
                }
            }
            catch (pErr) {
                if (pErr.errorCode === 111) {
                    TargetsActualsController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 111, 'INVALID_CREDENTIALS');
                }
                else if (pErr.errorCode === 112) {
                }
            }
        });
    }
    performance(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Start targets actuals");
            try {
                let vPerformanceData = new performance_model_1.PerformanceModel(pRequest.body.salesPerson, pRequest.body.actualType, pRequest.body.brand);
                console.log('All Param : ' + JSON.stringify(vPerformanceData));
                if (vPerformanceData.validate()) {
                    let vResult = yield TargetsActualsController._dataAccess.getTargetsActuals('get_targets_actuals', vPerformanceData);
                    console.log('All Targets : ' + JSON.stringify(vResult));
                    pResponse.json(vResult);
                }
                else {
                    TargetsActualsController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 100, 'INPUT_ERRORS', vPerformanceData.Errors);
                }
            }
            catch (pErr) {
                if (pErr.errorCode === 111) {
                    TargetsActualsController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 111, 'INVALID_CREDENTIALS');
                }
                else if (pErr.errorCode === 112) {
                }
            }
        });
    }
}
exports.TargetsActualsController = TargetsActualsController;
//# sourceMappingURL=targets-actuals.controller.js.map