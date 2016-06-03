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
const dsp_inventory_model_1 = require('../models/input/dsp-inventory.model');
class InventoryController {
    constructor() {
    }
    // dspPhysicalInventoryList(pRequest,pResponse){
    // 	console.log("masukk sini pak");
    // 	var vResult;
    // 	try{
    // 		vResult = {
    // 			status : "SUCCESS",
    // 			statusMessage : "BERHASIL BERHASIL HORE",
    // 			productList : [{
    // 				productID : "10001",
    // 				productName : "SKU1",
    // 				beginningBalance : "500",
    // 				newDelivery : "100",
    // 				sold : "100",
    // 				transferBack : "100",
    // 				endingBalance : "500",
    // 				dateModified : "20160429003012"
    // 			},{
    // 				productID : "10002",
    // 				productName : "SKU2",
    // 				beginningBalance : "700",
    // 				newDelivery : "100",
    // 				sold : "100",
    // 				transferBack : "100",
    // 				endingBalance : "700",
    // 				dateModified : "20160429003012"
    // 			}]
    // 		};
    // 	}catch(err){
    // 		vResult = {
    // 			status : "ERROR",
    // 			statusMessage : "GAGAL BRO",
    // 			productList : {
    // 			}
    // 		};
    // 	}
    // 	pResponse.json(vResult);
    // }
    physical(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            let vErrHandling = new error_handling_service_1.ErrorHandling.ErrorHandlingService();
            try {
                let vHttpSvc = new api_service_1.APIService.HTTPService();
                let vPath = '/OPISNET/services/idsp/DSPinventory';
                let vDspInventoryData = new dsp_inventory_model_1.DspInventoryModel(pRequest.query.username, pRequest.query.type);
                if (vDspInventoryData.validate()) {
                    console.log(vDspInventoryData);
                    let vResult = yield vHttpSvc.get(api_service_1.APIService.APIType.OPISNET, vPath, null, vDspInventoryData);
                    console.log('KELUAR PHYSICAL SINI : ' + vResult.status + ', pay : ' + JSON.stringify(vResult.payload));
                    pResponse.status(vResult.status).json(vResult.payload);
                }
                else {
                    vErrHandling.throwError(pResponse, error_handling_service_1.ErrorHandling.RESPONSE_CODE.FUNCTIONAL_ERROR, error_handling_service_1.ErrorHandling.ERROR_TYPE.INPUT_ERROR, "ERR_INVALID_CREDENTIAL");
                }
            }
            catch (pErr) {
                if (pErr.errorCode == 101) {
                    vErrHandling.throwError(pResponse, 400, 101, "ERR_INVALID_CREDENTIAL");
                }
            }
        });
    }
    load(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            let vErrHandling = new error_handling_service_1.ErrorHandling.ErrorHandlingService();
            try {
                let vHttpSvc = new api_service_1.APIService.HTTPService();
                let vPath = '/OPISNET/services/idsp/DSPinventory';
                let vDspInventoryData = new dsp_inventory_model_1.DspInventoryModel(pRequest.query.username, pRequest.query.type);
                if (vDspInventoryData.validate()) {
                    console.log(vDspInventoryData);
                    let vResult = yield vHttpSvc.get(api_service_1.APIService.APIType.OPISNET, vPath, null, vDspInventoryData);
                    console.log('KELUAR LOAD SINI : ' + vResult.status + ', pay : ' + JSON.stringify(vResult.payload));
                    pResponse.status(vResult.status).json(vResult.payload);
                }
                else {
                    vErrHandling.throwError(pResponse, error_handling_service_1.ErrorHandling.RESPONSE_CODE.FUNCTIONAL_ERROR, error_handling_service_1.ErrorHandling.ERROR_TYPE.INPUT_ERROR, "ERR_INVALID_CREDENTIAL");
                }
            }
            catch (pErr) {
                if (pErr.errorCode == 101) {
                    vErrHandling.throwError(pResponse, 400, 101, "ERR_INVALID_CREDENTIAL");
                }
            }
        });
    }
}
exports.InventoryController = InventoryController;
//# sourceMappingURL=inventory.controller.js.map