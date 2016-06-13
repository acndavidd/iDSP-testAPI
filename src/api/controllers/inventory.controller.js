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
const data_access_service_1 = require('../services/data-access.service');
const inventory_model_1 = require('../models/input/inventory/inventory.model');
class InventoryController {
    constructor() {
        InventoryController._dataAccess = new data_access_service_1.DataAccessService();
        InventoryController._errorHandling = new error_handling_service_1.ErrorHandlingService();
        InventoryController._httpService = new api_service_1.APIService.HTTPService();
    }
    physical(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let vHttpSvc = new api_service_1.APIService.HTTPService();
                let vPath = '/opisnet/services/idsp/dspphysicalinventory';
                let vResultAll = {
                    'status': 0,
                    'statusMessage': '',
                    'productList': []
                };
                let vPhysicalInventoryData = new inventory_model_1.Inventory.PhysicalInventory(pRequest.query.username, pRequest.query.recordstart, pRequest.query.recordend, null);
                if (vPhysicalInventoryData.validate()) {
                    let vResult = yield InventoryController._httpService.get(api_service_1.APIService.APIType.OPISNET, vPath, null, vPhysicalInventoryData.paramDSP);
                    // pResponse.status(vResult.status).json(vResult);
                    vResultAll.status = vResult.status;
                    vResultAll.statusMessage = vResult.statusMessage;
                    for (var i = 0; i < vResult.productList.length; i++) {
                        let product = {
                            'productID': vResult.productList[i].productID,
                            'productName': vResult.productList[i].productName,
                            'totalInventory': parseInt(vResult.productList[i].beginningBalance) + parseInt(vResult.productList[i].newDelivery),
                            'beginningBalance': parseInt(vResult.productList[i].beginningBalance),
                            'soldTransfer': parseInt(vResult.productList[i].newDelivery) + parseInt(vResult.productList[i].transferBack),
                            'sold': parseInt(vResult.productList[i].sold),
                            'transferBack': parseInt(vResult.productList[i].transferBack),
                            'endingBalance': parseInt(vResult.productList[i].endingBalance),
                        };
                        vResultAll.productList.push(product);
                    }
                    pResponse.status(vResultAll.status).json(vResultAll);
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
                let vResultAll = {
                    'status': 0,
                    'statusMessage': '',
                    'productList': []
                };
                let vLoadOpis;
                let vLoadElpSmart;
                let vLoadElpSun;
                let vLoadDb;
                let vLoadInventoryData = new inventory_model_1.Inventory.LoadInventory(pRequest.query.username, null, pRequest.query.corporateid, pRequest.query.branchid, pRequest.query.transactionkey, pRequest.query.requestrefno, pRequest.query.requesttimestamp, pRequest.query.terminalid, pRequest.query.address, pRequest.query.zipcode);
                // OPIS+
                try {
                    if (vLoadInventoryData.validate()) {
                        vLoadOpis = yield InventoryController._httpService.get(api_service_1.APIService.APIType.OPISNET, vPathOPIS, null, vLoadInventoryData.paramDSPOpis);
                        console.log('OPISSSS : ' + JSON.stringify(vLoadOpis));
                    }
                    else {
                    }
                }
                catch (pErr) {
                    if (pErr.errorCode == 101) {
                    }
                }
                // ELP SMART
                try {
                    if (vLoadInventoryData.validate()) {
                        vLoadElpSmart = yield InventoryController._httpService.get(api_service_1.APIService.APIType.ELP, vPathELP, null, vLoadInventoryData.paramDSPElpSmart);
                        console.log('ELP SMART : ' + JSON.stringify(vLoadElpSmart));
                    }
                    else {
                    }
                }
                catch (pErr) {
                    if (pErr.errorCode == 101) {
                    }
                }
                // ELP SUN
                try {
                    if (vLoadInventoryData.validate()) {
                        vLoadElpSun = yield InventoryController._httpService.get(api_service_1.APIService.APIType.ELP, vPathELP, null, vLoadInventoryData.paramDSPElpSun);
                        console.log('ELP SUN : ' + JSON.stringify(vLoadElpSun));
                    }
                    else {
                    }
                }
                catch (pErr) {
                    if (pErr.errorCode == 101) {
                    }
                }
                // DB
                try {
                    let request = {
                        username: pRequest.query.username
                    };
                    vLoadDb = yield InventoryController._dataAccess.getInventoryLoadDsp('get_inventory_load_dsp', request, false);
                    console.log('All INVENTORY LOAD : ' + JSON.stringify(vLoadDb));
                }
                catch (pErr) {
                    if (pErr.errorCode === 111) {
                        InventoryController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 111, 'INVALID_CREDENTIALS');
                    }
                    else if (pErr.errorCode === 112) {
                    }
                }
                console.log('DBBBBBB ' + vLoadDb.length);
                if (vLoadOpis.status === 200 && vLoadElpSmart.BalanceInquiryResponse.respCode === '0000' && vLoadElpSun.BalanceInquiryResponse.respCode === '0000') {
                    vResultAll.status = 200;
                    vResultAll.statusMessage = 'BERHASIL';
                    console.log('fffff : ' + vLoadOpis.productList.length);
                    for (var i = 0; i < vLoadOpis.productList.length; i++) {
                        var sold;
                        var loadWallet;
                        var lastModified;
                        if (vLoadOpis.productList[i].productID === 'SMARTLOAD') {
                            loadWallet = vLoadElpSmart.BalanceInquiryResponse.walletBalance;
                            lastModified = vLoadElpSmart.BalanceInquiryResponse.transactionTimestamp;
                            for (var a = 0; a < vLoadDb.length; a++) {
                                if (vLoadDb[a].product_id === 'SMARTLOAD') {
                                    sold = vLoadDb[a].total_sold_today;
                                }
                            }
                        }
                        else if (vLoadOpis.productList[i].productID === 'XPRESSLOAD') {
                            loadWallet = vLoadElpSun.BalanceInquiryResponse.walletBalance;
                            lastModified = vLoadElpSun.BalanceInquiryResponse.transactionTimestamp;
                            for (var a = 0; a < vLoadDb.length; a++) {
                                if (vLoadDb[a].product_id === 'XPRESSLOAD') {
                                    sold = vLoadDb[a].total_sold_today;
                                }
                            }
                        }
                        console.log('123 : ' + sold);
                        var totalInventory = parseInt(vLoadOpis.productList[i].beginningBalance) + parseInt(vLoadOpis.productList[i].newDelivery);
                        var endingBalance = totalInventory - sold;
                        let product = {
                            'productID': vLoadOpis.productList[i].productID,
                            'productName': vLoadOpis.productList[i].productName,
                            'totalInventory': totalInventory,
                            'beginningBalance': parseInt(vLoadOpis.productList[i].beginningBalance),
                            'newDelivery': parseInt(vLoadOpis.productList[i].newDelivery),
                            'lastModifiedBB': vLoadOpis.productList[i].lastModified,
                            'sold': sold,
                            'sales': sold,
                            'endingBalance': endingBalance,
                            'currentBalance': parseInt(loadWallet),
                            'lastModifiedCB': lastModified,
                        };
                        vResultAll.productList.push(product);
                    }
                    console.log('nnnnn : ' + JSON.stringify(vResultAll));
                    pResponse.status(vResultAll.status).json(vResultAll);
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