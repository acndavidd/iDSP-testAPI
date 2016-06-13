'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const data_access_service_1 = require('../services/data-access.service');
const api_service_1 = require('../services/api.service');
const error_handling_service_1 = require('../services/error-handling.service');
class GlobalController {
    constructor() {
        GlobalController._dataAccess = new data_access_service_1.DataAccessService();
        GlobalController._errorHandling = new error_handling_service_1.ErrorHandlingService();
        GlobalController._httpService = new api_service_1.APIService.HTTPService();
    }
    brand(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Start getting Brands');
            try {
                var vParam = '';
                let vResult = yield GlobalController._dataAccess.getBrands('get_brands', null);
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
                    GlobalController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 111, 'INVALID_CREDENTIALS');
                }
                else if (pErr.errorCode === 112) {
                }
            }
        });
    }
    productID(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Start getting productID');
            try {
                var vParam = '';
                let vResult = yield GlobalController._dataAccess.getProductID('get_product_id', null);
                console.log('All productID : ' + JSON.stringify(vResult));
                if (vResult) {
                    pResponse.json(vResult);
                }
                else {
                    console.log('PRODUCT ID NOT FOUND');
                }
            }
            catch (pErr) {
                if (pErr.errorCode === 111) {
                    GlobalController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 111, 'INVALID_CREDENTIALS');
                }
                else if (pErr.errorCode === 112) {
                }
            }
        });
    }
}
exports.GlobalController = GlobalController;
//# sourceMappingURL=global.controller.js.map