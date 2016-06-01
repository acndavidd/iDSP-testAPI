'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const token_service_1 = require('../services/token.service');
const orm_service_1 = require('../services/orm.service');
const api_service_1 = require('../services/api.service');
const error_handling_service_1 = require('../services/error-handling.service');
const login_model_1 = require('../models/input/login.model');
const mpin_model_1 = require('../models/input/mpin.model');
class LoginController {
    constructor() {
    }
    testSuccess(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            let vErrHandling = new error_handling_service_1.ErrorHandling.ErrorHandlingService();
            try {
                let vOrmService = new orm_service_1.ORMService();
                try {
                    let vResult = yield vOrmService.sp('SUCCESS_SP', null);
                    pResponse.status(vResult.status).json(vResult.payload);
                }
                catch (pErr) {
                    if (pErr.errorCode == error_handling_service_1.ErrorHandling.ERROR_TYPE.ERROR_SEQUELIZE) {
                        vErrHandling.throwError(pResponse, 400, pErr.errorCode, "Error happened on sequelize");
                    }
                    else {
                        // handle other error code
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
    testError(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            let vErrHandling = new error_handling_service_1.ErrorHandling.ErrorHandlingService();
            try {
                let vOrmService = new orm_service_1.ORMService();
                let vResult = yield vOrmService.sp('ERROR_SP', null);
                pResponse.status(vResult.status).json(vResult.payload);
            }
            catch (pErr) {
                vErrHandling.throwError(pResponse, 400, 101, "Error SP");
            }
        });
    }
    testSP(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            let vErrHandling = new error_handling_service_1.ErrorHandling.ErrorHandlingService();
            try {
                let vOrmService = new orm_service_1.ORMService();
                let vParams = {
                    test: 100
                };
                let vResult = yield vOrmService.sp('test_sp', vParams, true);
                pResponse.status(vResult.status).json(vResult.payload);
            }
            catch (pErr) {
                if (pErr.errorCode === error_handling_service_1.ErrorHandling.ERROR_TYPE.ERROR_SEQUELIZE) {
                    vErrHandling.throwError(pResponse, error_handling_service_1.ErrorHandling.RESPONSE_CODE.SYSTEM_ERROR, pErr.errorCode, pErr.description);
                }
            }
        });
    }
    login(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            let vErrHandling = new error_handling_service_1.ErrorHandling.ErrorHandlingService();
            try {
                let vHttpSvc = new api_service_1.APIService.HTTPService();
                let vPath = '/OPISNET/services/idsp/userValidation';
                let vLoginData = new login_model_1.LoginModel(pRequest.body.Username, pRequest.body.Password);
                if (vLoginData.validate()) {
                    let vResult = yield vHttpSvc.post(api_service_1.APIService.APIType.OPISNET, vPath, null, vLoginData);
                    pResponse.status(vResult.status).json(vResult.payload);
                }
                else {
                    vErrHandling.throwError(pResponse, error_handling_service_1.ErrorHandling.RESPONSE_CODE.FUNCTIONAL_ERROR, error_handling_service_1.ErrorHandling.ERROR_TYPE.INPUT_ERROR, vLoginData.Errors);
                }
            }
            catch (pErr) {
                if (pErr.errorCode == 101) {
                    vErrHandling.throwError(pResponse, 400, 101, "ERR_INVALID_CREDENTIAL");
                }
            }
        });
    }
    submitMPIN(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            let vErrHandling = new error_handling_service_1.ErrorHandling.ErrorHandlingService();
            try {
                let vHttpSvc = new api_service_1.APIService.HTTPService();
                let vTokenSvc = new token_service_1.TokenService();
                let vPath = '/OPISNET/services/idsp/userAuthorization';
                let vMPINData = new mpin_model_1.MPINModel(pRequest.body.Username, pRequest.body.MPIN);
                if (vMPINData.validate()) {
                    let vResult = yield vHttpSvc.post(api_service_1.APIService.APIType.OPISNET, vPath, null, vMPINData);
                    // If success login , generate token for services
                    let vTokenObj = {
                        DSP_ID: pRequest.body.Username,
                        AccessToken: vResult.payload.AccessToken
                    };
                    vResult.payload.accessToken = vTokenSvc.generateToken(vTokenObj);
                    // Set Cookie session for web access
                    pResponse.cookie('accessToken', vResult.payload.accessToken, { httpOnly: true });
                    pResponse.status(vResult.status).json(vResult.payload);
                }
                else {
                    vErrHandling.throwError(pResponse, 400, 101, "INPUT_ERROR", vMPINData.Errors);
                }
            }
            catch (pErr) {
                if (pErr.errCode == 101) {
                    vErrHandling.throwError(pResponse, 400, 101, "ERR_INVALID_MPIN");
                }
            }
        });
    }
    verifyToken(pRequest, pResponse) {
        let vTokenSvc = new token_service_1.TokenService();
        let vResult = {
            Status: 200,
            StatusMessage: "Success Bro",
            TokenObject: pResponse.locals.jwt
        };
        pResponse.json(vResult);
    }
    logout(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            let vErrHandling = new error_handling_service_1.ErrorHandling.ErrorHandlingService();
            try {
                pResponse.clearCookie('accessToken');
                pResponse.status(200).json();
            }
            catch (pErr) {
                vErrHandling.throwError(pResponse, 400, 101, pErr);
            }
        });
    }
}
exports.LoginController = LoginController;
//# sourceMappingURL=login.controller.js.map