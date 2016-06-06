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
const dsp_inventory_model_1 = require('../models/input/dsp-inventory.model');
class InventoryController {
    constructor() {
    }
    physical(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let vHttpSvc = new api_service_1.APIService.HTTPService();
                let vPath = '/OPISNET/services/idsp/DSPinventory';
                let vDspInventoryData = new dsp_inventory_model_1.DspInventoryModel(pRequest.query.username, pRequest.query.type);
                if (vDspInventoryData.validate()) {
                    console.log(vDspInventoryData);
                    let vResult = yield vHttpSvc.get(api_service_1.APIService.APIType.OPISNET, vPath, null, vDspInventoryData);
                    console.log('KELUAR PHYSICAL SINI : ' + vResult.status + ', pay : ' + JSON.stringify(vResult));
                    pResponse.status(vResult.status).json(vResult);
                }
                else {
                }
            }
            catch (pErr) {
                if (pErr.errorCode == 101) {
                }
            }
        });
    }
    load(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
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
                }
            }
            catch (pErr) {
                if (pErr.errorCode == 101) {
                }
            }
        });
    }
}
exports.InventoryController = InventoryController;
//# sourceMappingURL=inventory.controller.js.map