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
const inventory_model_1 = require('../models/input/inventory/inventory.model');
class InventoryController {
    constructor() {
    }
    physical(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let vHttpSvc = new api_service_1.APIService.HTTPService();
                let vPath = '/opisnet/services/idsp/dspphysicalinventory';
                // let vPhysicalInventoryData = new Inventory.PhysicalInventory(pRequest.query.username, '1', '5', null);
                let vPhysicalInventoryData = new inventory_model_1.Inventory.PhysicalInventory(pRequest.query.username, null, null, null);
                if (vPhysicalInventoryData.validate()) {
                    let vResult = yield vHttpSvc.get(api_service_1.APIService.APIType.OPISNET, vPath, null, vPhysicalInventoryData.paramDSP);
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
                let vPathOPIS = '/opisnet/services/idsp/dsploadinventory';
                let vPathELP = '/ELPNET/services/idsp/dspLoadInventory';
                let vLoadInventoryData = new inventory_model_1.Inventory.LoadInventory(pRequest.query.username, null, null, null, null, null, null, null, null, null, null);
                // OPIS+
                try {
                    if (vLoadInventoryData.validate()) {
                        let vResult = yield vHttpSvc.get(api_service_1.APIService.APIType.OPISNET, vPathOPIS, null, vLoadInventoryData.paramDSPOpis);
                        pResponse.status(vResult.status).json(vResult);
                    }
                    else {
                    }
                }
                catch (pErr) {
                    if (pErr.errorCode == 101) {
                    }
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