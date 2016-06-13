'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const orm_service_1 = require('../../services/orm.service');
const api_service_1 = require('../../services/api.service');
const error_handling_service_1 = require('../../services/error-handling.service');
const retailer_model_1 = require('../../models/output/retailer.model');
const physical_inventory_model_1 = require('../../models/input/inventory/physical-inventory.model');
const retailer_model_2 = require('../../models/input/retailer.model');
const data_access_service_1 = require('../../services/data-access.service');
class TaskController {
    constructor() {
        TaskController._dataAccess = new data_access_service_1.DataAccessService();
        TaskController._errorHandling = new error_handling_service_1.ErrorHandlingService();
        TaskController._httpService = new api_service_1.APIService.HTTPService();
    }
    task(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Start getting retailer route for BCP");
            var vSalesPerson = pRequest.query.username;
            try {
                let vPath = '/OPISNET/services/idsp/AllRT';
                let vRetailerData = new retailer_model_2.RetailerModel(vSalesPerson);
                if (vRetailerData.validate()) {
                    // Catch result from API
                    let vResult = yield TaskController._httpService.get(api_service_1.APIService.APIType.OPISNET, vPath, null, vRetailerData);
                    console.log('total record : ' + JSON.stringify(vResult.recordCount));
                    var vTotalRetailer = vResult.recordCount;
                    var vAllRetailers = [];
                    // Start getting the retailer details
                    if (vTotalRetailer > 0) {
                        for (var i = 0; i < vResult.recordCount; i++) {
                            var vRetailerAsJSON = new retailer_model_1.RetailerOutputModel(vResult.retailerList[i].retailerId, vResult.retailerList[i].storeName, vResult.retailerList[i].outletType, vResult.retailerList[i].retailerMinDetails, vResult.retailerList[i].retailerAddress, vResult.retailerList[i].numberofSELFTransaction, vResult.retailerList[i].numberofAgingSELFTransaction, vResult.retailerList[i].totalAmountofSELFTransaction, vResult.retailerList[i].dspId, vResult.retailerList[i].dspName).param_to_db;
                            vAllRetailers = vAllRetailers.concat(vRetailerAsJSON);
                        }
                        try {
                            let vResultData = yield TaskController._dataAccess.getRouteDay('get_route_day', vAllRetailers, true);
                            // console.log('All result ' + JSON.stringify(vResultData));
                            pResponse.json(vResultData.sort(function (a, b) {
                                if (a.getroute.sequence_no === null && b.getroute.sequence_no === null) {
                                    return 0;
                                }
                                if (a.getroute.sequence_no === null) {
                                    return 1;
                                }
                                if (b.getroute.sequence_no === null) {
                                    return -1;
                                }
                                if (parseInt(a.getroute.sequence_no) > parseInt(b.getroute.sequence_no)) {
                                    return 1;
                                }
                                if (parseInt(a.getroute.sequence_no) < parseInt(b.getroute.sequence_no)) {
                                    return -1;
                                }
                                else {
                                    return 0;
                                }
                            }));
                        }
                        catch (pErr) {
                            console.log('Cannot Get Data From Database');
                            throw pErr;
                        }
                    }
                    else {
                        console.log('No Route for Today');
                    }
                }
                else {
                    TaskController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 101, "INPUT_ERROR", vRetailerData.Errors);
                }
            }
            catch (pErr) {
                console.log(pErr);
                if (pErr.errorCode == 101) {
                    TaskController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 101, "ERR_INVALID_CREDENTIAL");
                }
            }
        });
    }
    collection(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Start getting collection");
            var vSalesPerson = pRequest.body.salesPerson;
            var vRetailerId = pRequest.body.retailerId;
            try {
                let vParam = new physical_inventory_model_1.PhysicalInventoryModel(vSalesPerson, vRetailerId);
                console.log('Param Physical Inventory : ' + JSON.stringify(vParam));
                if (vParam.validate()) {
                    let vResult = yield TaskController._dataAccess.getCollection('get_collection', vParam);
                    // console.log('All Result Physical Inventory : ' + JSON.stringify(vResult));
                    pResponse.json(vResult);
                }
                else {
                    TaskController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 100, 'INPUT_ERRORS', vParam.Errors);
                }
            }
            catch (pErr) {
                if (pErr.errorCode === 111) {
                    TaskController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 111, 'INVALID_CREDENTIALS');
                }
                else if (pErr.errorCode === 112) {
                }
            }
        });
    }
    additionalRetailerRoute(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Start getting Physical Inventory");
                var vSalesPerson = pRequest.body.salesPerson;
                var vDay = pRequest.body.pDay;
                console.log(vSalesPerson + 'DSP id');
                var vOrmSvc = new orm_service_1.ORMService();
                let vParams = {
                    salesPerson: vSalesPerson,
                    pDay: vDay
                };
                var vResult = yield vOrmSvc.sp('get_additional_retailer', vParams);
                console.log("Query Done with result : " + JSON.stringify(vResponse));
                var vResponse = {
                    "status": "Success",
                    "errorMessage": "",
                    "result": vResult
                };
                pResponse.json(vResponse);
            }
            catch (pErr) {
                console.log("Failed to Query Payment History" + pErr);
                var vError = {
                    "status": "Error",
                    "errorMessage": pErr,
                    "result": null
                };
                pResponse.json(vError);
            }
        });
    }
}
exports.TaskController = TaskController;
//# sourceMappingURL=task.controller.js.map