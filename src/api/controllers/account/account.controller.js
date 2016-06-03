"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const error_handling_service_1 = require('../../services/error-handling.service');
const api_service_1 = require('../../services/api.service');
const account_model_1 = require('../../models/input/account.model');
const data_access_service_1 = require('../../services/data-access.service');
class AccountController {
    constructor() {
        AccountController._dataAccess = new data_access_service_1.DataAccessService();
        AccountController._errorHandling = new error_handling_service_1.ErrorHandlingService();
        AccountController._httpService = new api_service_1.APIService.HTTPService();
    }
    authenticate(pRequest, pResponse) {
        return __awaiter(this, void 0, Promise, function* () {
            try {
                let vAccount = new account_model_1.Account(pRequest.body.Username, pRequest.body.Password);
                if (vAccount.validate()) {
                    let vLoginServiceURL = '/OPISNET/services/idsp/userValidation';
                    let vPayLoad = yield AccountController._httpService.post(api_service_1.APIService.APIType.OPISNET, vLoginServiceURL, null, vAccount);
                    pResponse.status(200).json(vPayLoad.MPIN);
                }
                else {
                    AccountController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 100, 'INPUT_ERRORS', vAccount.Errors);
                }
            }
            catch (pErr) {
                if (pErr.errorCode === 111) {
                    AccountController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 111, 'INVALID_CREDENTIALS');
                }
                else if (pErr.errorCode === 112) {
                }
            }
        });
    }
    submitMPIN(pRequest, pResponse) {
        return __awaiter(this, void 0, Promise, function* () {
        });
    }
    logout(pRequest, pResponse) {
        return __awaiter(this, void 0, Promise, function* () {
        });
    }
    testSP(pRequest, pResponse) {
        return __awaiter(this, void 0, Promise, function* () {
            try {
                let vParams = {
                    test: 100
                };
                let vSPResult = yield AccountController._dataAccess.executeSP('test_sp', vParams, true);
                pResponse.status(200).json(vSPResult);
            }
            catch (pErr) {
                console.log(pErr);
            }
        });
    }
}
exports.AccountController = AccountController;
//# sourceMappingURL=account.controller.js.map