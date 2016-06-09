'use strict';
import {ORMService} from '../../services/orm.service';
import {APIService} from '../../services/api.service';
import {ErrorHandlingService} from '../../services/error-handling.service';
import {TokenService} from '../../services/token.service';
import {DataAccessService} from '../../services/data-access.service';

// import your model here
import {TokenObject} from '../../models/token.model';
import {RetailerProfileModel} from '../../models/input/retailer-profile.model';
import {SelfTransactionRetailerModel} from '../../models/input/self/selftransaction-per-retailer.model';

import {PhysicalInventoryModel} from '../../models/input/inventory/physical-inventory.model';

//import {ErrHandlerService} from '../services/err.handler.service';

export interface RetailerInterface{
	getRetailerThreshold(pRequest, pResponse): Promise<void>;
	getProduct(pRequest, pResponse):Promise<void>;
	getRetailerSummary(pRequest, pResponse):Promise<void>;
	getSalesRoute(pRequest, pResponse):Promise<void>;
	loadWallet(pRequest, pResponse):Promise<void>;
	additionalRetailer(pRequest, pResponse):Promise<void>;
	lastAmountTransferred(pRequest, pResponse):Promise<void>;
}

export class RetailerController implements RetailerInterface {
	private static _errorHandling: ErrorHandlingService;
	private static _httpService: APIService.HTTPService;
	private static _dataAccess: DataAccessService;
	private vUsername: string;

	constructor() {
		RetailerController._dataAccess = new DataAccessService();
		RetailerController._errorHandling = new ErrorHandlingService();
		RetailerController._httpService = new APIService.HTTPService();
	}
	
	getProduct(pRequest,pResponse) {
		let vOrmSvc = new ORMService();
		let vProdCatModel = vOrmSvc.getModel('mst_prod_cat');
		vProdCatModel.findAll({
			attributes : ['category_name' , 'brand'],
			include : [{
				model : vOrmSvc.getModel('mst_prod_sub_cat'),
				as : 'ProductSubCategory',
				required : true,
				attributes : ['sub_category_name'],
				include : [{
					model : vOrmSvc.getModel('mst_product'),
					attributes : ['product_id'],
					as : 'Product',
					required : true,
					include : [{
						model : vOrmSvc.getModel('mst_target'),
						as : 'Target',
						attributes : ['target_qty'],
						required : true,
					}]
				}]
			}]
		}).then(function(pProdCats){
			pProdCats = JSON.parse(JSON.stringify(pProdCats));
			pProdCats.map(function(pProdCat){
				pProdCat.ProductSubCategory.map(function(pProdSubCat){
					let vSumTarget = 0;
					pProdSubCat.Product.map(function(pProd){
						vSumTarget += pProd.Target.reduce(function(pPrevVal,pCurrVal){
							return  pPrevVal.target_qty + pCurrVal.target_qty;
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

	// async getRetailerSummary(pRequest, pResponse){
	// 	try{
	// 		console.log("Start getting Retailer Summary");
	// 		var vSelectedRetailId = pRequest.params.retailerId;
	// 		var vOrmSvc = new ORMService();

	// 		let vParams = {
	// 			selected_ret_id : vSelectedRetailId
	// 		};

	// 		var vResult = JSON.parse(await vOrmSvc.sp('get_retailer_summary', vParams ));     
	// 		console.log("Query Done with result : "+ JSON.stringify(vResult));

	// 		if (vResult.status == "Error")
	// 		{
	// 			vResult = {
	// 					"status" : vResult.status,
	// 					"errorType": vResult.errorType,
	// 					//"errorCode": this.errService.getErrorMessage(vResult.errorCode),
	// 					"result" : null
	// 			};
	// 		}

	// 		pResponse.json(vResult);			
	// 	}
	// 	catch(pErr){
	// 		console.log("Failed to Query Retailer Summary with error message" + pErr);

	// 		var vError = {
	// 					"status" : "Error",
	// 					"errorType": "Internal Exception",
	// 					//"errorCode": this.errService.getErrorMessage("ERR_INTERNAL_SYSTEM"),
	// 					"result" : null
	// 				};
	// 		pResponse.json(vError);
	// 	}
	// }
	
	// async getSalesRoute(pRequest, pResponse){
	// 	try{
	// 		console.log("Start getting sales route");
	// 		var vSalesPerson = pRequest.params.salesPerson;
	// 		var vSelectedDay = pRequest.params.day;			
	// 		let vOrmSvc = new ORMService();
			
	// 		let vParams = {
	// 			selected_day : vSelectedDay,
	// 			sales_person : vSalesPerson
	// 		};

	// 		var vResult = await vOrmSvc.sp('get_retailer_route', vParams );
	// 		console.log("Query Done with result : "+ JSON.stringify(vResult));

	// 		pResponse.json(vResult);			
	// 	}
	// 	catch(pErr){
	// 		console.log("Failed to Query Sales Route with error message" + pErr);
	// 		var vError = {
	// 					"status" : "Error",
	// 					"errorType": "Internal Exception",
	// 					"errorCode": "ERR_INTERNAL_SYSTEM",
	// 					"result" : ""
	// 				};

	// 		pResponse.json(vError);
	// 	}
	// }

	async getAllRetailerAlert(pRequest,pResponse){
		console.log("Start getAllRetailerAlert");
		let vOrmSvc = new ORMService();
		let params = {
			dsp_id : 'DSP00001'
		};
		var vResult = {
			success : 1,
			result : await vOrmSvc.sp('get_retailer_alert', params)
		};
		pResponse.json(vResult);
	}

	async getRetailerThreshold(pRequest, pResponse) {
		try{
			let serviceURL: string = '/opisnet/services/idsp/dspalert';
			let vTokenService = new TokenService();
			let vTokebObject = new TokenObject();
			let vToken = pResponse.locals.token;
			// console.log(vToken);
			vTokebObject = vTokenService.decryptToken(vToken);
			let params = {
				username : vTokebObject.getDSPId()
			};
			// console.log(params);
			let vPayLoad = await RetailerController._httpService.post(APIService.APIType.OPISNET, serviceURL, null, params);
			if(vPayLoad.status === 200) {
				pResponse.status(200).json(vPayLoad);
			}else { // api call success but error on the logic
				
			}
		}catch(pErr) {
			if(pErr.code) {
				RetailerController._errorHandling.throwHTTPErrorResponse(pResponse, 400, pErr.code, pErr.desc);
			}else {
				RetailerController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 103, pErr);
			}
		}
	}


	async retailerProfile(pRequest,pResponse) {

		console.log("Start getting Call Preparation");

				var vSalesPerson = pRequest.query.username;
				var vRetailerId = pRequest.query.retailerid;

			try{
				let vPath:string = '/OPISNET/services/idsp/rtprofile';
				let vRetailerData = new RetailerProfileModel(vSalesPerson,vRetailerId);
				// console.log('parammmm' + JSON.stringify(vRetailerData));

				if(vRetailerData.validate()) {
					// Catch result from API
					let vResult = await RetailerController._httpService.get(APIService.APIType.OPISNET, vPath, null, vRetailerData);
					// console.log('For Call procedure'+JSON.stringify(vResult));

					pResponse.status(200).json(vResult.retailerProfileList);
				}else {
					RetailerController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 101, "INPUT_ERROR", vRetailerData.Errors);
				}
			}catch(pErr){
				console.log(pErr);
				if(pErr.errorCode == 101) {
					RetailerController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 101, "ERR_INVALID_CREDENTIAL");
				}
			}
	} 

	async physicalInventory(pRequest,pResponse) {
		console.log("Start getting Physical Inventory");

				var vSalesPerson = 'DSP00001';
				var vRetailerId = pRequest.params.id;
		try{
			let vParam = new PhysicalInventoryModel(vSalesPerson, vRetailerId);
			console.log('Param Physical Inventory : ' + JSON.stringify(vParam));
				if(vParam.validate()) {
					let vResult = await RetailerController._dataAccess.getPhysicalInventory('get_phy_drop_size', vParam);
					// console.log('All Result Physical Inventory : ' + JSON.stringify(vResult));
					pResponse.json(vResult);
				}else {
					RetailerController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 100, 'INPUT_ERRORS', vParam.Errors);
				}
		}
		catch(pErr) {
			if(pErr.InventoryController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 111, 'INVALID_CREDENTIALS')) {

			}
		}
	}

	async lastAmountTransferred(pRequest,pResponse) {
			console.log("Start getting last amount transferred");
			var vSalesPerson = 'DSP00001';
			var vRetailerId = pRequest.params.id;

		try{
			let vPath:string = '/opisnet/services/idsp/rtloadinventory';
			let vRetailerData = new RetailerProfileModel(vSalesPerson,vRetailerId);

			if(vRetailerData.validate()) {
				// Catch result from API
				let vResult = await RetailerController._httpService.get(APIService.APIType.OPISNET, vPath, null, vRetailerData);

				let vResultAll = {
					'status' : 0,
					'statusMessage' : '',
					'productList' : []
				};

				vResultAll.status = 200;
				vResultAll.statusMessage = 'OK';

				console.log('last amount total : '+ vResult.productList.length);

				if(vResult.productList.length  > 0 ) {
					for (var i = 0 ; i < vResult.productList.length ; i++) {
						let product = {
							'productId' : vResult.productList[i].productId,
							'productName' : vResult.productList[i].productName,
							'lastAmountTransferredbyDsp' : parseInt(vResult.productList[i].lastAmountTransferredbyDsp),
							'transactionDate' : vResult.productList[i].transactionDate
						}
						vResultAll.productList.push(product);
					}
					console.log('Last Transfered'+JSON.stringify(vResultAll));
					pResponse.status(200).json(vResultAll.productList);
				}
				else {
					pResponse.status(200).json(vResult);
				}
			}else {
				RetailerController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 101, "INPUT_ERROR", vRetailerData.Errors);
			}
		} catch(pErr) {
				if(pErr.InventoryController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 111, 'INVALID_CREDENTIALS')) {
					throw pErr;
				}
		}	
	}

	async loadWallet(pRequest,pResponse) {
		
			console.log("Start getting Load Wallet");
			var vSalesPerson = 'DSP00001';
			var vRetailerId = pRequest.params.id;
			var vAllDropSize= [];
			var result;
			try{
				let vParam = new PhysicalInventoryModel(vSalesPerson, vRetailerId);
					if(vParam.validate()) {						
						let vResult = await RetailerController._dataAccess.getDropSize('get_load_drop_size', vParam);
						pResponse.json(vResult);

					}else {
						RetailerController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 100, 'INPUT_ERRORS', vParam.Errors);
					}
			}
			catch(pErr) {
				if(pErr.InventoryController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 111, 'INVALID_CREDENTIALS')) {

				}
			}	
	}


	async outstandingBalance(pRequest,pResponse) {
			console.log("Start getting last amount transferred");
			var vSalesPerson = 'DSP00001';
			var vRetailerId = pRequest.params.id;
			var vRecordStart = 0;
			var vRecordEnd = 1;

		try{
			let vPath:string = '/opisnet/services/idsp/selftransactions';
			let vRetailerData = new SelfTransactionRetailerModel(vSalesPerson,vRetailerId,vRecordStart,vRecordEnd);
			console.log('paramm'+JSON.stringify(vRetailerData));

			if(vRetailerData.validate()) {

				let vResultSelf = await RetailerController._httpService.get(APIService.APIType.OPISNET, vPath, null, vRetailerData);
				let vParam = new PhysicalInventoryModel(vSalesPerson, vRetailerId);
				let vResultBCP = await RetailerController._dataAccess.getOutstandingBalanceBCP('get_outstanding_balance', vParam);

				let vResultAll = {
					'status' : 0,
					'statusMessage' : '',
					'totalRecord' : vResultSelf.totalRecord,
					'totalAmount' : parseInt(vResultSelf.totalAmount)+parseInt(vResultBCP[0].amount) ,
					'selfTransactionList' : []
				};

				vResultAll.status = 200;
				vResultAll.statusMessage = 'OK';

				console.log('last amount total : '+ vResultSelf.selfTransactionList.length);

				if(vResultSelf.selfTransactionList.length  > 0 ) {
					for (var i = 0 ; i < vResultSelf.selfTransactionList.length ; i++) {
						let self = {
							'retailerMIN' : vResultSelf.selfTransactionList[i].retailerMIN,
							'transactionId' : vResultSelf.selfTransactionList[i].transactionId,
							'transactionDate' : vResultSelf.selfTransactionList[i].transactionDate,
							'amount' : parseInt(vResultSelf.selfTransactionList[i].amount)
						}
						vResultAll.selfTransactionList.push(self);
					}
					console.log('Outstanding balance : '+JSON.stringify(vResultAll));
					pResponse.status(200).json(vResultAll);
				}
				else {
					pResponse.status(200).json(vResultAll);
				}
			}else {
				RetailerController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 101, "INPUT_ERROR", vRetailerData.Errors);
			}
		} catch(pErr) {
				if(pErr.InventoryController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 111, 'INVALID_CREDENTIALS')) {
					throw pErr;
				}
		}	
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

	//}
}