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
const token_service_1 = require('../../services/token.service');
const data_access_service_1 = require('../../services/data-access.service');
// import your model here
const token_model_1 = require('../../models/token.model');
const retailer_profile_model_1 = require('../../models/input/retailer-profile.model');
const balance_model_1 = require('../../models/input/retailer/balance.model');
const dropsize_model_1 = require('../../models/input/retailer/dropsize.model');
const physical_inventory_model_1 = require('../../models/input/inventory/physical-inventory.model');
class RetailerController {
    constructor() {
        RetailerController._dataAccess = new data_access_service_1.DataAccessService();
        RetailerController._errorHandling = new error_handling_service_1.ErrorHandlingService();
        RetailerController._httpService = new api_service_1.APIService.HTTPService();
    }
    getProduct(pRequest, pResponse) {
        let vOrmSvc = new orm_service_1.ORMService();
        let vProdCatModel = vOrmSvc.getModel('mst_prod_cat');
        vProdCatModel.findAll({
            attributes: ['category_name', 'brand'],
            include: [{
                    model: vOrmSvc.getModel('mst_prod_sub_cat'),
                    as: 'ProductSubCategory',
                    required: true,
                    attributes: ['sub_category_name'],
                    include: [{
                            model: vOrmSvc.getModel('mst_product'),
                            attributes: ['product_id'],
                            as: 'Product',
                            required: true,
                            include: [{
                                    model: vOrmSvc.getModel('mst_target'),
                                    as: 'Target',
                                    attributes: ['target_qty'],
                                    required: true,
                                }]
                        }]
                }]
        }).then(function (pProdCats) {
            pProdCats = JSON.parse(JSON.stringify(pProdCats));
            pProdCats.map(function (pProdCat) {
                pProdCat.ProductSubCategory.map(function (pProdSubCat) {
                    let vSumTarget = 0;
                    pProdSubCat.Product.map(function (pProd) {
                        vSumTarget += pProd.Target.reduce(function (pPrevVal, pCurrVal) {
                            return pPrevVal.target_qty + pCurrVal.target_qty;
                        }).target_qty;
                        delete pProd.Target;
                    });
                    pProdSubCat.target_sum = vSumTarget;
                    delete pProdSubCat.Product;
                });
            });
            pResponse.json(pProdCats);
        });
    }
    getRetailerSummary(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Start getting Retailer Summary");
                var vSelectedRetailId = pRequest.params.retailerId;
                var vOrmSvc = new orm_service_1.ORMService();
                let vParams = {
                    selected_ret_id: vSelectedRetailId
                };
                var vResult = JSON.parse(yield RetailerController._dataAccess.getRetailerSummary('get_retailer_summary', vParams));
                console.log("Query Done with result : " + JSON.stringify(vResult));
                if (vResult.status == "Error") {
                    vResult = {
                        "status": vResult.status,
                        "errorType": vResult.errorType,
                        //"errorCode": this.errService.getErrorMessage(vResult.errorCode),
                        "result": null
                    };
                }
                pResponse.json(vResult);
            }
            catch (pErr) {
                console.log("Failed to Query Retailer Summary with error message" + pErr);
                var vError = {
                    "status": "Error",
                    "errorType": "Internal Exception",
                    //"errorCode": this.errService.getErrorMessage("ERR_INTERNAL_SYSTEM"),
                    "result": null
                };
                pResponse.json(vError);
            }
        });
    }
    getSalesRoute(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Start getting sales route");
                var vSalesPerson = pRequest.params.salesPerson;
                var vSelectedDay = pRequest.params.day;
                let vOrmSvc = new orm_service_1.ORMService();
                let vParams = {
                    selected_day: vSelectedDay,
                    sales_person: vSalesPerson
                };
                var vResult = yield RetailerController._dataAccess.getSalesRoute('get_retailer_route', vParams);
                console.log("Query Done with result : " + JSON.stringify(vResult));
                pResponse.json(vResult);
            }
            catch (pErr) {
                console.log("Failed to Query Sales Route with error message" + pErr);
                var vError = {
                    "status": "Error",
                    "errorType": "Internal Exception",
                    "errorCode": "ERR_INTERNAL_SYSTEM",
                    "result": ""
                };
                pResponse.json(vError);
            }
        });
    }
    getAllRetailerAlert(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Start getAllRetailerAlert");
            let vOrmSvc = new orm_service_1.ORMService();
            let params = {
                dsp_id: 'DSP00001'
            };
            var vResult = {
                success: 1,
                result: yield vOrmSvc.sp('get_retailer_alert', params)
            };
            pResponse.json(vResult);
        });
    }
    getRetailerThreshold(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let serviceURL = '/opisnet/services/idsp/dspalert';
                let vTokenService = new token_service_1.TokenService();
                let vTokebObject = new token_model_1.TokenObject();
                let vToken = pResponse.locals.token;
                console.log(vToken);
                vTokebObject = vTokenService.decryptToken(vToken);
                let params = {
                    username: vTokebObject.getDSPId()
                };
                console.log(params);
                let vPayLoad = yield RetailerController._httpService.post(api_service_1.APIService.APIType.OPISNET, serviceURL, null, params);
                if (vPayLoad.status === 200) {
                    pResponse.status(200).json(vPayLoad);
                }
                else {
                }
            }
            catch (pErr) {
                if (pErr.code) {
                    RetailerController._errorHandling.throwHTTPErrorResponse(pResponse, 400, pErr.code, pErr.desc);
                }
                else {
                    RetailerController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 103, pErr);
                }
            }
        });
    }
    retailerProfile(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Start getting Call Preparation");
            var vSalesPerson = pRequest.query.username;
            var vRetailerId = pRequest.query.retailerid;
            try {
                let vPath = '/OPISNET/services/idsp/rtprofile';
                let vRetailerData = new retailer_profile_model_1.RetailerProfileModel(vSalesPerson, vRetailerId);
                // console.log('parammmm' + JSON.stringify(vRetailerData));
                if (vRetailerData.validate()) {
                    // Catch result from API
                    let vResult = yield RetailerController._httpService.get(api_service_1.APIService.APIType.OPISNET, vPath, null, vRetailerData);
                    // console.log('For Call procedure'+JSON.stringify(vResult));
                    pResponse.status(200).json(vResult.retailerProfileList);
                }
                else {
                    RetailerController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 101, "INPUT_ERROR", vRetailerData.Errors);
                }
            }
            catch (pErr) {
                console.log(pErr);
                if (pErr.errorCode == 101) {
                    RetailerController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 101, "ERR_INVALID_CREDENTIAL");
                }
            }
        });
    }
    physicalInventory(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Start getting Physical Inventory");
            var vSalesPerson = 'DSP00001';
            var vRetailerId = pRequest.params.id;
            try {
                let vParam = new physical_inventory_model_1.PhysicalInventoryModel(vSalesPerson, vRetailerId);
                console.log('Param Physical Inventory : ' + JSON.stringify(vParam));
                if (vParam.validate()) {
                    let vResult = yield RetailerController._dataAccess.getPhysicalInventory('get_physical_inventory', vParam);
                    // console.log('All Result Physical Inventory : ' + JSON.stringify(vResult));
                    pResponse.json(vResult);
                }
                else {
                    RetailerController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 100, 'INPUT_ERRORS', vParam.Errors);
                }
            }
            catch (pErr) {
                if (pErr.InventoryController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 111, 'INVALID_CREDENTIALS')) {
                }
            }
        });
    }
    loadWallet(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Start getting Load Wallet");
                var vSalesPerson = 'DSP00001';
                var vRetailerId = pRequest.params.id;
                // console.log(vSelectedRetailId+'retailer id');
                var vOrmSvc = new orm_service_1.ORMService();
                let vParams = {
                    sales_person: vSalesPerson,
                    selected_ret_id: vRetailerId
                };
                var vResult = [{
                        "brand": "SmartLoad",
                        "drop_size": "350",
                        "last_amount_transferred": "1200",
                        "transaction_date": "04/01/2016",
                        "latest_balance": "1000",
                        "retailer_id": "RTL00001"
                    }];
                // console.log("Query Done with result : "+ JSON.stringify(vResponse));
                var vResponse = {
                    "status": "Success",
                    "errorMessage": "",
                    "result": vResult
                };
                pResponse.json(vResponse);
            }
            catch (pErr) {
                console.log("Failed to Query Load Wallet with error message" + pErr);
                var vError = {
                    "status": "Error",
                    "errorMessage": pErr,
                    "result": null
                };
                pResponse.json(vError);
            }
        });
    }
    getSuggestedOrder(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('In getSuggestedOrder controller');
                var vMonth = new Date().getMonth();
                if (pRequest.query.subcat_type === 'L') {
                    let vData = new dropsize_model_1.DropsizeModel(pRequest.query.brand, vMonth, pRequest.params.id, pRequest.query.subcat_type);
                    var vSuggestedOrder = yield RetailerController._dataAccess.getDropSize('get_bcp_dropsize', vData);
                    console.log('Result : ' + vSuggestedOrder);
                    pResponse.status(200).json(vSuggestedOrder);
                }
                else {
                    console.log('P');
                }
            }
            catch (pErr) {
                JSON.stringify(pErr);
                RetailerController._errorHandling.throwError(400, 'Failed to get suggested order', pErr);
            }
        });
    }
    getCurrentBalance(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('in getCurrentBalance controller');
                let vPath = '/elpnet/services/idsp/retailerbalance';
                let vParams = new balance_model_1.BalanceModel(pRequest.body.min, pRequest.body.source);
                let vResult = yield RetailerController._httpService.post(api_service_1.APIService.APIType.ELP, vPath, null, vParams);
                pResponse.status(200).json(vResult);
            }
            catch (pErr) {
                RetailerController._errorHandling.throwError(400, 'Failed to get balance from ELP', pErr);
            }
        });
    }
}
exports.RetailerController = RetailerController;
//# sourceMappingURL=retailer.controller.js.map