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
                    vErrHandling.processModelValidationError(vLoginData.Errors);
                }
            }
            catch (pErr) {
                if (pErr.errorCode == 101) {
                    vErrHandling.throwError(pResponse, 400, 101, "ERR_INVALID_CREDENTIAL");
                }
            }
            // pResponse.json(vResult);
        });
    }
    submitMPIN(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            let vErrHandling = new error_handling_service_1.ErrorHandling.ErrorHandlingService();
            try {
                let vHttpSvc = new api_service_1.APIService.HTTPService();
                let vTokenSvc = new token_service_1.TokenService();
                let vPath = '/OPISNET/services/idsp/userAuthorization';
                let vData = {
                    Username: pRequest.body.Username,
                    MPIN: pRequest.body.MPIN
                };
                let vResult = yield vHttpSvc.post(api_service_1.APIService.APIType.OPISNET, vPath, null, vData);
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
            let vResult = {
                Status: 200,
                StatusMessage: "Success Bro"
            };
            pResponse.clearCookie('accessToken');
            pResponse.json(vResult);
        });
    }
    test(pRequest, pResponse) {
        try {
            var message = 'Insert start.';
            console.log("mw Init");
            var orm = new orm_service_1.ORMService();
            console.log("mw map mode");
            var vOrder_id;
            return orm.getSequelize().transaction(function (t) {
                var sales_order_new = orm.getModel("trx_sales_order");
                return sales_order_new.create({
                    dsp_id: 'DSP01',
                    retailer_id: 'RET01',
                    total_amount: 1000000
                }, { transaction: t }).then(function (so) {
                    vOrder_id = so.get("order_id");
                    console.log("Successfully insert " + vOrder_id);
                    var unserve1 = orm.getModel('trx_unserved_order');
                    var promises = [];
                    promises.push(unserve1.create({
                        order_id: vOrder_id,
                        product_id: 'P00001',
                        quantity: 10,
                        remarks: 'YO MAMEN 1'
                    }, { transaction: t }));
                    promises.push(unserve1.create({
                        order_id: vOrder_id,
                        product_id: 'P00002',
                        quantity: 100,
                        remarks: 'YO MAMEN 2'
                    }, { transaction: t }));
                    console.log("start hit promise");
                    return Promise.all([
                        promises
                    ]);
                });
            }).then(function (result) {
                // Transaction has been committed
                // result is whatever the result of the promise chain returned to the transaction callback
                //console.log(t.)
                pResponse.send("Success Transaction" + ' Time :' + new Date().toLocaleString() + " with ID : " + vOrder_id);
                //Sample query and get Children and get 
                var so = orm.getModel("trx_sales_order");
                so.find({
                    where: { order_id: vOrder_id }
                }).then(function (match) {
                    match.getSalesOrderUnserved().then(function (resultUnserved) {
                        console.log(resultUnserved.length);
                        console.log(resultUnserved[0].get("product_id"));
                        console.log(resultUnserved[1].get("product_id"));
                    });
                });
                var unSo = orm.getModel("trx_unserved_order");
                unSo.find({
                    where: { order_id: vOrder_id }
                }).then(function (match) {
                    match.getSalesOrder().then(function (resultSO) {
                        console.log(resultSO.get("retailer_id"));
                    });
                });
            }).catch(function (err) {
                // Transaction has been rolled back
                // err is whatever rejected the promise chain returned to the transaction callback
                //t.rollback();
                pResponse.send("Failed to Insert" + ' Time :' + new Date().toLocaleString() + " Error : " + err);
            });
        }
        catch (pErr) {
            console.log(pErr);
        }
    }
}
exports.LoginController = LoginController;
//# sourceMappingURL=login.controller.js.map