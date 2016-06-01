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
const error_handling_service_1 = require('../services/error-handling.service');
const performance_model_1 = require('../models/input/performance.model');
class TargetsActualsController {
    constructor() {
    }
    brand(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Start getting Brands');
            let vErrHandling = new error_handling_service_1.ErrorHandling.ErrorHandlingService();
            try {
                let vOrmService = new orm_service_1.ORMService();
                try {
                    let vResult = yield vOrmService.sp('get_brands', null);
                    pResponse.status(vResult.status).json(vResult.payload);
                }
                catch (pErr) {
                    console.log(pErr);
                    if (pErr.errorCode == error_handling_service_1.ErrorHandling.ERROR_TYPE.ERROR_SEQUELIZE) {
                        vErrHandling.throwError(pResponse, 400, pErr.errorCode, "Error happened on sequelize");
                    }
                    else {
                        //handle other error code
                        switch (pErr.errorCode) {
                            case 101:
                                vErrHandling.throwError(pResponse, 400, 101, "Error b");
                                break;
                        }
                    }
                }
            }
            catch (pErr) {
                vErrHandling.throwError(pResponse, 400, 101, "test message");
            }
        });
    }
    performance(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Start targets actuals");
            let vErrHandling = new error_handling_service_1.ErrorHandling.ErrorHandlingService();
            try {
                let vOrmService = new orm_service_1.ORMService();
                try {
                    let vPerformanceData = new performance_model_1.PerformanceModel(pRequest.body.salesPerson, pRequest.body.actualType, pRequest.body.brand);
                    if (vPerformanceData.validate()) {
                        let vResult = yield vOrmService.sp('get_target_actuals', vPerformanceData);
                        pResponse.status(vResult.status).json(vResult.payload);
                    }
                    else {
                        vErrHandling.throwError(pResponse, 400, 101, "INPUT_ERROR", vPerformanceData.Errors);
                    }
                }
                catch (pErr) {
                    console.log(pErr);
                    if (pErr.errorCode == error_handling_service_1.ErrorHandling.ERROR_TYPE.ERROR_SEQUELIZE) {
                        vErrHandling.throwError(pResponse, 400, pErr.errorCode, "Error happened on sequelize");
                    }
                    else {
                        //handle other error code
                        switch (pErr.errorCode) {
                            case 101:
                                vErrHandling.throwError(pResponse, 400, 101, "Error b");
                                break;
                        }
                    }
                }
            }
            catch (pErr) {
                vErrHandling.throwError(pResponse, 400, 101, "test message");
            }
        });
    }
}
exports.TargetsActualsController = TargetsActualsController;
//# sourceMappingURL=targets-actuals.controller.js.map