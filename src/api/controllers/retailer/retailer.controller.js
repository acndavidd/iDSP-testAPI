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
const selftransaction_per_retailer_model_1 = require('../../models/input/self/selftransaction-per-retailer.model');
const balance_model_1 = require('../../models/input/retailer/balance.model');
const dropsize_model_1 = require('../../models/input/retailer/dropsize.model');
const physical_inventory_model_1 = require('../../models/input/inventory/physical-inventory.model');
class RetailerController {
    constructor() {
        RetailerController._dataAccess = new data_access_service_1.DataAccessService();
        RetailerController._errorHandling = new error_handling_service_1.ErrorHandlingService();
        RetailerController._httpService = new api_service_1.APIService.HTTPService();
    }
    // getProduct(pRequest,pResponse) {
    // 	let vOrmSvc = new ORMService();
    // 	let vProdCatModel = vOrmSvc.getModel('mst_prod_cat');
    // 	vProdCatModel.findAll({
    // 		attributes : ['category_name' , 'brand'],
    // 		include : [{
    // 			model : vOrmSvc.getModel('mst_prod_sub_cat'),
    // 			as : 'ProductSubCategory',
    // 			required : true,
    // 			attributes : ['sub_category_name'],
    // 			include : [{
    // 				model : vOrmSvc.getModel('mst_product'),
    // 				attributes : ['product_id'],
    // 				as : 'Product',
    // 				required : true,
    // 				include : [{
    // 					model : vOrmSvc.getModel('mst_target'),
    // 					as : 'Target',
    // 					attributes : ['target_qty'],
    // 					required : true,
    // 				}]
    // 			}]
    // 		}]
    // 	}).then(function(pProdCats){
    // 		pProdCats = JSON.parse(JSON.stringify(pProdCats));
    // 		pProdCats.map(function(pProdCat){
    // 			pProdCat.ProductSubCategory.map(function(pProdSubCat){
    // 				let vSumTarget = 0;
    // 				pProdSubCat.Product.map(function(pProd){
    // 					vSumTarget += pProd.Target.reduce(function(pPrevVal,pCurrVal){
    // 						return  pPrevVal.target_qty + pCurrVal.target_qty;
    // 					}).target_qty;
    // 					delete pProd.Target;
    // 				});
    // 				pProdSubCat.target_sum = vSumTarget;
    // 				delete pProdSubCat.Product;
    // 			});
    // 		});
    // 		pResponse.json(pProdCats);
    // 	});
    // }
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
                let vTokebObject = new token_model_1.TokenObject(null, null, null, null);
                let vToken = pResponse.locals.token;
                // console.log(vToken);
                vTokebObject = vTokenService.decryptToken(vToken);
                let params = {
                    username: vTokebObject.getDSPId()
                };
                // console.log(params);
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
            var vDay = 5;
            try {
                let vPath = '/OPISNET/services/idsp/rtprofile';
                let vRetailerData = new retailer_profile_model_1.RetailerProfileModel(vSalesPerson, vRetailerId);
                let vCallInfo = new retailer_profile_model_1.RetailerProfileModel(vSalesPerson, vRetailerId);
                // console.log('parammmm' + JSON.stringify(vRetailerData));
                if (vRetailerData.validate()) {
                    // Catch result from API
                    let vResult = yield RetailerController._httpService.get(api_service_1.APIService.APIType.OPISNET, vPath, null, vRetailerData);
                    let vResultCallInfo = yield RetailerController._dataAccess.getCallInfo('get_call_info', vCallInfo);
                    let vResultBCP = yield RetailerController._dataAccess.getOutstandingBalanceBCP('get_outstanding_balance', vRetailerData);
                    let vResultCallInfoTemp = {
                        'status': 200,
                        'statusMessage': '',
                        'callInfo': vResultCallInfo
                    };
                    let vResultBCPTemp = {
                        'status': 200,
                        'statusMessage': '',
                        'resultBCP': vResultBCP
                    };
                    if (vResult && vResultCallInfo) {
                        let vResultAll = {
                            'status': 200,
                            'statusMessage': '',
                            'retailerProfileList': []
                        };
                        vResultAll.status = 200;
                        vResultAll.statusMessage = 'OK';
                        console.log('total profile : ' + vResult.retailerProfileList.length);
                        for (var i = 0; i < vResult.retailerProfileList.length; i++) {
                            let self = {
                                'retailerMIN': vResult.retailerProfileList[i].retailerMIN,
                                'retailerID': vResult.retailerProfileList[i].retailerID,
                                'storeName': vResult.retailerProfileList[i].storeName,
                                'outletType': vResult.retailerProfileList[i].outletType,
                                'subOutletType': vResult.retailerProfileList[i].subOutletType,
                                'ownerFirstName': vResult.retailerProfileList[i].ownerFirstName,
                                'ownerMiddleName': vResult.retailerProfileList[i].ownerMiddleName,
                                'ownerLastName': vResult.retailerProfileList[i].ownerLastName,
                                'personalMin': vResult.retailerProfileList[i].personalMin,
                                'storeAddress': vResult.retailerProfileList[i].storeAddress,
                                'civilStatus': vResult.retailerProfileList[i].civilStatus,
                                'email': vResult.retailerProfileList[i].email,
                                'gender': vResult.retailerProfileList[i].gender,
                                'birthday': vResult.retailerProfileList[i].birthday,
                                'totalAmountofSelfTransaction': vResult.retailerProfileList[i].totalAmountofSelfTransaction,
                                'valueSegment': vResult.retailerProfileList[i].valueSegment,
                                'threshold': vResult.retailerProfileList[i].threshold,
                                'dspId': vResult.retailerProfileList[i].dspId,
                                'dspName': vResult.retailerProfileList[i].dspName,
                                'firstRetailerMIN': vResult.retailerProfileList[i].firstRetailerMIN,
                                'amountReceivables': vResultBCPTemp.resultBCP[i].amount,
                                'status': vResultCallInfoTemp.callInfo[i].call_status,
                                'lastVisit': vResultCallInfoTemp.callInfo[i].call_date
                            };
                            vResultAll.retailerProfileList.push(self);
                        }
                        pResponse.status(200).json(vResultAll.retailerProfileList);
                    }
                    else {
                        console.log('NO DATA');
                    }
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
                    let vResult = yield RetailerController._dataAccess.getPhysicalInventory('get_phy_drop_size', vParam);
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
    lastAmountTransferred(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Start getting last amount transferred");
            var vSalesPerson = 'DSP00001';
            var vRetailerId = pRequest.params.id;
            try {
                let vPath = '/opisnet/services/idsp/rtloadinventory';
                let vRetailerData = new retailer_profile_model_1.RetailerProfileModel(vSalesPerson, vRetailerId);
                if (vRetailerData.validate()) {
                    // Catch result from API
                    let vResult = yield RetailerController._httpService.get(api_service_1.APIService.APIType.OPISNET, vPath, null, vRetailerData);
                    let vResultAll = {
                        'status': 0,
                        'statusMessage': '',
                        'productList': []
                    };
                    vResultAll.status = 200;
                    vResultAll.statusMessage = 'OK';
                    console.log('lastAmountTransferred : ' + vResult.productList.length);
                    if (vResult.productList.length > 0) {
                        for (var i = 0; i < vResult.productList.length; i++) {
                            let product = {
                                'productId': vResult.productList[i].productId,
                                'productName': vResult.productList[i].productName,
                                'lastAmountTransferredbyDsp': parseInt(vResult.productList[i].lastAmountTransferredbyDsp),
                                'transactionDate': vResult.productList[i].transactionDate
                            };
                            vResultAll.productList.push(product);
                        }
                        console.log('Last Transfered' + JSON.stringify(vResultAll));
                        pResponse.status(200).json(vResultAll.productList);
                    }
                    else {
                        pResponse.status(200).json(vResult);
                    }
                }
                else {
                    RetailerController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 101, "INPUT_ERROR", vRetailerData.Errors);
                }
            }
            catch (pErr) {
                if (pErr.InventoryController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 111, 'INVALID_CREDENTIALS')) {
                    throw pErr;
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
                var vAllDropSize = [];
                var result;
                try {
                    let vParam = new physical_inventory_model_1.PhysicalInventoryModel(vSalesPerson, vRetailerId);
                    if (vParam.validate()) {
                        let vResult = yield RetailerController._dataAccess.getDropSize('get_load_drop_size', vParam);
                        if (vResult) {
                            pResponse.json(vResult);
                        }
                        else {
                            console.log('NO DATA');
                        }
                    }
                    else {
                        RetailerController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 100, 'INPUT_ERRORS', vParam.Errors);
                    }
                }
                catch (pErr) {
                    if (pErr.InventoryController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 111, 'INVALID_CREDENTIALS')) {
                    }
                }
            }
            catch (pErr) {
                throw pErr;
            }
        });
    }
    // console.log(vSelectedRetailId+'retailer id');
    outstandingBalance(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Start getting last amount transferred");
            var vSalesPerson = 'DSP00001';
            var vRetailerId = pRequest.params.id;
            var vRecordStart = 0;
            var vRecordEnd = 1;
            try {
                let vPath = '/opisnet/services/idsp/selftransactions';
                let vRetailerData = new selftransaction_per_retailer_model_1.SelfTransactionRetailerModel(vSalesPerson, vRetailerId, vRecordStart, vRecordEnd);
                console.log('paramm' + JSON.stringify(vRetailerData));
                if (vRetailerData.validate()) {
                    let vResultSelf = yield RetailerController._httpService.get(api_service_1.APIService.APIType.OPISNET, vPath, null, vRetailerData);
                    let vParam = new physical_inventory_model_1.PhysicalInventoryModel(vSalesPerson, vRetailerId);
                    let vResultBCP = yield RetailerController._dataAccess.getOutstandingBalanceBCP('get_outstanding_balance', vParam);
                    if (vResultBCP && vResultSelf) {
                        console.log('MASUK IF:');
                        let vResultAll = {
                            'status': 0,
                            'statusMessage': '',
                            'totalRecord': vResultSelf.totalRecord,
                            'totalAmount': parseInt(vResultSelf.totalAmount) + parseInt(vResultBCP[0].amount),
                            'selfTransactionList': []
                        };
                        vResultAll.status = 200;
                        vResultAll.statusMessage = 'OK';
                        console.log('outstandingBalance : ' + vResultSelf.selfTransactionList.length);
                        for (var i = 0; i < vResultSelf.selfTransactionList.length; i++) {
                            let self = {
                                'retailerMIN': vResultSelf.selfTransactionList[i].retailerMIN,
                                'transactionId': vResultSelf.selfTransactionList[i].transactionId,
                                'transactionDate': vResultSelf.selfTransactionList[i].transactionDate,
                                'amount': parseInt(vResultSelf.selfTransactionList[i].amount)
                            };
                            vResultAll.selfTransactionList.push(self);
                        }
                        pResponse.status(200).json(vResultAll);
                    }
                    else {
                        console.log('masuk else');
                        let vResultAll = {
                            'status': 200,
                            'statusMessage': 'OK',
                            'totalRecord': 0,
                            'totalAmount': 0,
                            'selfTransactionList': [{
                                    'retailerMIN': 0,
                                    'transactionId': 0,
                                    'transactionDate': 0,
                                    'amount': 0
                                }]
                        };
                        console.log('Outstanding balance : ' + JSON.stringify(vResultAll));
                        pResponse.status(200).json(vResultAll);
                    }
                }
                else {
                    RetailerController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 101, "INPUT_ERROR", vRetailerData.Errors);
                }
            }
            catch (pErr) {
                if (pErr.InventoryController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 111, 'INVALID_CREDENTIALS')) {
                    throw pErr;
                }
            }
        });
    }
    // async additionalRetailer(pRequest,pResponse) {
    // 		console.log("Start getting additional retaielr");
    // 		var vSalesPerson = pRequest.params.id;
    // 	try{
    // 		let vParam = new PhysicalInventoryModel(vSalesPerson, null);
    // 		console.log('Param Physical Inventory : ' + JSON.stringify(vParam));
    // 			if(vParam.validate()) {
    // 				let vResult = await RetailerController._dataAccess.getAdditionalRetailer('get_additional_retailer', vParam);
    // 				// console.log('All Result Physical Inventory : ' + JSON.stringify(vResult));
    // 				pResponse.json(vResult);
    // 			}else {
    // 				RetailerController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 100, 'INPUT_ERRORS', vParam.Errors);
    // 			}
    // 	}
    // 	catch(pErr) {
    // 		if(pErr.InventoryController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 111, 'INVALID_CREDENTIALS')) {
    // 			}
    // 		}
    // =======
    // 			var vOrmSvc = new ORMService();
    // 			let vParams = {
    // 				sales_person : vSalesPerson,
    // 				selected_ret_id : vRetailerId
    // 			};
    // 			var vResult = [{
    // 				"brand":"SmartLoad",
    // 				"drop_size":"350",
    // 				"last_amount_transferred":"1200",
    // 				"transaction_date":"04/01/2016",
    // 				"latest_balance":"1000",
    // 				"retailer_id":"RTL00001"
    // 			}]
    // 			// console.log("Query Done with result : "+ JSON.stringify(vResponse));
    // 			var vResponse = {
    // 						"status" : "Success",
    // 						"errorMessage" : "",
    // 						"result" : vResult
    // 					};
    // 			pResponse.json(vResponse);
    // 		}
    // 		catch(pErr)
    // 		{
    // 			console.log("Failed to Query Load Wallet with error message" + pErr);
    // 			var vError = {
    // 						"status" : "Error",
    // 						"errorMessage" : pErr,
    // 						"result" : null
    // 					};
    // 			pResponse.json(vError);
    // 		}
    // 	}
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