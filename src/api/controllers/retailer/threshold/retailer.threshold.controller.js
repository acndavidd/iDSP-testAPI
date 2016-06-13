"use strict";
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
const token_service_1 = require('../../../services/token.service');
const token_model_1 = require('../../../models/token.model');
class RetailerThreshold {
    constructor() {
        RetailerThreshold._errorHandling = new error_handling_service_1.ErrorHandlingService();
        RetailerThreshold._httpService = new api_service_1.APIService.HTTPService();
    }
    getRetailerThreshold(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let serviceURL = '/opisnet/services/idsp/dspalert';
                let vTokenService = new token_service_1.TokenService();
                let vTokenObject = new token_model_1.TokenObject();
                let vToken = pResponse.locals.accessToken;
                vTokenObject = vTokenService.decryptToken(vToken);
                console.log(vTokenObject);
                let params = {
                    username: vTokenObject.getDSPId()
                };
                console.log(params);
                let vPayLoad = yield RetailerThreshold._httpService.post(api_service_1.APIService.APIType.OPISNET, serviceURL, null, params);
                if (vPayLoad.status === 200) {
                    pResponse.status(200).json(vPayLoad);
                }
                else {
                }
            }
            catch (pErr) {
                if (pErr.code) {
                    RetailerThreshold._errorHandling.throwHTTPErrorResponse(pResponse, 400, pErr.code, pErr.desc);
                }
                else {
                    RetailerThreshold._errorHandling.throwHTTPErrorResponse(pResponse, 400, 103, pErr);
                }
            }
        });
    }
}
exports.RetailerThreshold = RetailerThreshold;
//# sourceMappingURL=retailer.threshold.controller.js.map