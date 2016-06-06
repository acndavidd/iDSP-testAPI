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
const token_service_1 = require('../../services/token.service');
const account_model_1 = require('../../models/input/account/account.model');
const token_model_1 = require('../../models/token.model');
const data_access_service_1 = require('../../services/data-access.service');
const utility_1 = require('../../shared/utility');
class AccountController {
    constructor() {
        AccountController._dataAccess = new data_access_service_1.DataAccessService();
        AccountController._errorHandling = new error_handling_service_1.ErrorHandlingService();
        AccountController._httpService = new api_service_1.APIService.HTTPService();
    }
    authenticate(pRequest, pResponse) {
        return __awaiter(this, void 0, Promise, function* () {
            try {
                let vAccount = new account_model_1.Account.Account(pRequest.body.Username, pRequest.body.Password);
                if (vAccount.validate()) {
                    let vLoginServiceURL = '/OPISNET/services/idsp/userValidation';
                    let vPayLoad = yield AccountController._httpService.post(api_service_1.APIService.APIType.OPISNET, vLoginServiceURL, null, vAccount);
                    if (vPayLoad.status === 200) {
                        pResponse.status(200).json(vPayLoad);
                    }
                    else {
                        if (vPayLoad.status === 403) {
                            AccountController._errorHandling.throwHTTPErrorResponse(pResponse, 500, 121, 'ERR_INVALID_CREDENTIAL');
                        }
                    }
                }
                else {
                    AccountController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 100, 'INPUT_ERRORS', vAccount.Errors);
                }
            }
            catch (pErr) {
                if (pErr.code) {
                    AccountController._errorHandling.throwHTTPErrorResponse(pResponse, 400, pErr.code, pErr.desc);
                }
                else {
                    AccountController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 103, pErr);
                }
            }
        });
    }
    submitMPIN(pRequest, pResponse) {
        return __awaiter(this, void 0, Promise, function* () {
            try {
                let vHttpSvc = new api_service_1.APIService.HTTPService();
                let vPath = '/OPISNET/services/idsp/userAuthorization';
                let vMPIN = new account_model_1.Account.MPIN(pRequest.params.id, pRequest.body.MPIN);
                if (vMPIN.validate()) {
                    let vPayLoad = yield vHttpSvc.post(api_service_1.APIService.APIType.OPISNET, vPath, null, vMPIN);
                    // if success encrypt dsp id as token object
                    if (vPayLoad.status === 200) {
                        let vTokenService = new token_service_1.TokenService();
                        let vTokenObj = new token_model_1.TokenObject();
                        vTokenObj.setDSPId(pRequest.params.id);
                        vTokenObj.setOPISToken = vPayLoad.AccessToken;
                        let vTokenStr = vTokenService.encryptToken(vTokenObj);
                        // set cookie session value with token
                        pResponse.cookie('accessToken', vTokenStr, { httpOnly: true });
                        vPayLoad.accessToken = vTokenStr;
                        delete vPayLoad.AccessToken;
                        pResponse.status(200).json(vPayLoad);
                    }
                    else {
                        AccountController._errorHandling.throwHTTPErrorResponse(pResponse, 500, 121, 'ERR_INVALID_MPIN');
                    }
                }
                else {
                    AccountController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 100, 'INPUT_ERRORS', vMPIN.Errors);
                }
            }
            catch (pErr) {
                if (pErr.code) {
                    AccountController._errorHandling.throwHTTPErrorResponse(pResponse, 400, pErr.code, pErr.desc);
                }
                else {
                    AccountController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 103, pErr);
                }
            }
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
                console.log('before sort : ' + JSON.stringify(vSPResult));
                vSPResult = utility_1.Utility.sortJSON(vSPResult, 'test');
                console.log('after sort : ' + JSON.stringify(vSPResult));
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