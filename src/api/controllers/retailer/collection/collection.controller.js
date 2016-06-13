'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
// initial
const data_access_service_1 = require('../../../services/data-access.service');
const api_service_1 = require('../../../services/api.service');
const error_handling_service_1 = require('../../../services/error-handling.service');
// import your model here
const physical_inventory_model_1 = require('../../../models/input/inventory/physical-inventory.model');
class CollectionController {
    constructor() {
        CollectionController._dataAccessService = new data_access_service_1.DataAccessService();
        CollectionController._httpService = new api_service_1.APIService.HTTPService();
        CollectionController._errorHandling = new error_handling_service_1.ErrorHandlingService();
    }
    getCollection(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Start getting collection.");
            var vSalesPerson = 'DSP00001';
            var vRetailerId = pRequest.params.retailid;
            try {
                let vParam = new physical_inventory_model_1.PhysicalInventoryModel(vSalesPerson, vRetailerId);
                if (vParam.validate()) {
                    let vResult = yield CollectionController._dataAccessService.getCollection('get_collection', vParam);
                    pResponse.json(vResult);
                }
                else {
                    CollectionController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 100, 'INPUT_ERRORS', vParam.Errors);
                }
            }
            catch (pErr) {
                if (pErr.errorCode === 111) {
                    CollectionController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 111, 'INVALID_CREDENTIALS');
                }
                else if (pErr.errorCode === 112) {
                }
            }
            console.log("end getting collection.");
        });
    }
}
exports.CollectionController = CollectionController;
//# sourceMappingURL=collection.controller.js.map