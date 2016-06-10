'use strict';
import {ORMService} from '../../services/orm.service';
import {APIService} from '../../services/api.service';
import {ErrorHandlingService} from '../../services/error-handling.service';
import {TokenService} from '../../services/token.service';
import {DataAccessService} from '../../services/data-access.service';

// import your model here
import {TokenObject} from '../../models/token.model';
import {RetailerProfileModel} from '../../models/input/retailer-profile.model';
import {CallInfoModel} from '../../models/input/retailer/call-info.model';
import {SelfTransactionRetailerModel} from '../../models/input/self/selftransaction-per-retailer.model';
import {BalanceModel} from '../../models/input/retailer/balance.model';
import {DropsizeModel} from '../../models/input/retailer/dropsize.model';
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
	getSuggestedOrder(pRequest, pResponse):Promise<void>;
	getCurrentBalance(pRequest, pResponse):Promise<void>;
}

export class RetailerController implements RetailerInterface{
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

	async getRetailerSummary(pRequest, pResponse){
		try{
			console.log("Start getting Retailer Summary");
			var vSelectedRetailId = pRequest.params.retailerId;
			var vOrmSvc = new ORMService();

			let vParams = {
				selected_ret_id : vSelectedRetailId
			};

			var vResult = JSON.parse(await RetailerController._dataAccess.getRetailerSummary('get_retailer_summary', vParams ));     
			console.log("Query Done with result : "+ JSON.stringify(vResult));

			if (vResult.status == "Error")
			{
				vResult = {
						"status" : vResult.status,
						"errorType": vResult.errorType,
						//"errorCode": this.errService.getErrorMessage(vResult.errorCode),
						"result" : null
				};
			}

			pResponse.json(vResult);			
		}
		catch(pErr){
			console.log("Failed to Query Retailer Summary with error message" + pErr);

			var vError = {
						"status" : "Error",
						"errorType": "Internal Exception",
						//"errorCode": this.errService.getErrorMessage("ERR_INTERNAL_SYSTEM"),
						"result" : null
					};
			pResponse.json(vError);
		}
	}
	
	async getSalesRoute(pRequest, pResponse){
		try{
			console.log("Start getting sales route");
			var vSalesPerson = pRequest.params.salesPerson;
			var vSelectedDay = pRequest.params.day;			
			let vOrmSvc = new ORMService();
			
			let vParams = {
				selected_day : vSelectedDay,
				sales_person : vSalesPerson
			};

			var vResult = await RetailerController._dataAccess.getSalesRoute('get_retailer_route', vParams );
			console.log("Query Done with result : "+ JSON.stringify(vResult));

			pResponse.json(vResult);			
		}
		catch(pErr){
			console.log("Failed to Query Sales Route with error message" + pErr);
			var vError = {
						"status" : "Error",
						"errorType": "Internal Exception",
						"errorCode": "ERR_INTERNAL_SYSTEM",
						"result" : ""
					};

			pResponse.json(vError);
		}
	}

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
				var vDay = 5;

			try{
				let vPath:string = '/OPISNET/services/idsp/rtprofile';
				let vRetailerData = new RetailerProfileModel(vSalesPerson,vRetailerId);
				let vCallInfo = new RetailerProfileModel(vSalesPerson,vRetailerId);
				// console.log('parammmm' + JSON.stringify(vRetailerData));

				if(vRetailerData.validate()) {
					// Catch result from API
					let vResult = await RetailerController._httpService.get(APIService.APIType.OPISNET, vPath, null, vRetailerData);
						let vResultCallInfo = await RetailerController._dataAccess.getCallInfo('get_call_info', vCallInfo);
							let vResultBCP = await RetailerController._dataAccess.getOutstandingBalanceBCP('get_outstanding_balance', vRetailerData);
												
						if(vResult && vResultCallInfo) {
							let vResultAll = {
								'status' : 200,
								'statusMessage' : '',
								'retailerProfileList' : []
							};

							vResultAll.status = 200;
							vResultAll.statusMessage = 'OK';

							console.log('total profile : '+ vResult.retailerProfileList.length);

								for (var i = 0 ; i < vResult.retailerProfileList.length ; i++) {
									let self = {
										'retailerMIN' : vResult.retailerProfileList[i].retailerMIN,
										'retailerID' : vResult.retailerProfileList[i].retailerID,
										'storeName' : vResult.retailerProfileList[i].storeName,
										'outletType' : vResult.retailerProfileList[i].outletType,
										'subOutletType' : vResult.retailerProfileList[i].subOutletType,
										'ownerFirstName' : vResult.retailerProfileList[i].ownerFirstName,
										'ownerMiddleName' : vResult.retailerProfileList[i].ownerMiddleName,
										'ownerLastName' : vResult.retailerProfileList[i].ownerLastName,
										'personalMin' : vResult.retailerProfileList[i].personalMin,
										'storeAddress' : vResult.retailerProfileList[i].storeAddress,
										'civilStatus' : vResult.retailerProfileList[i].civilStatus,
										'email' : vResult.retailerProfileList[i].email,
										'gender' : vResult.retailerProfileList[i].gender,
										'birthday' : vResult.retailerProfileList[i].birthday,
										'totalAmountofSelfTransaction' : vResult.retailerProfileList[i].totalAmountofSelfTransaction,
										'valueSegment' : vResult.retailerProfileList[i].valueSegment,
										'threshold' : vResult.retailerProfileList[i].threshold,
										'dspId' : vResult.retailerProfileList[i].dspId,
										'dspName' : vResult.retailerProfileList[i].dspName,
										'firstRetailerMIN' : vResult.retailerProfileList[i].firstRetailerMIN,
										'amountReceivables' : parseInt(vResultBCP[i].amount),
										'status' : vResultCallInfo[i].call_status,
										'lastVisit' : vResultCallInfo[i].call_date

									}
									vResultAll.retailerProfileList.push(self);
								}
							pResponse.status(200).json(vResultAll.retailerProfileList);

					} else {
						console.log('NO DATA')
					}

					// pResponse.status(200).json(vResult.retailerProfileList);
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

				console.log('lastAmountTransferred : '+ vResult.productList.length);

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
		try{
			console.log("Start getting Load Wallet");

			var vSalesPerson = 'DSP00001';
			var vRetailerId = pRequest.params.id;
			var vAllDropSize= [];
			var result;
			try{
				let vParam = new PhysicalInventoryModel(vSalesPerson, vRetailerId);
					if(vParam.validate()) {						
						let vResult = await RetailerController._dataAccess.getDropSize('get_load_drop_size', vParam);
						if(vResult) {
							pResponse.json(vResult);
						}
						else {
							console.log('NO DATA');
						}

					}else {
						RetailerController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 100, 'INPUT_ERRORS', vParam.Errors);
					}
			}
			catch(pErr) {
				if(pErr.InventoryController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 111, 'INVALID_CREDENTIALS')) {
				}
			}
		}
	}
			// console.log(vSelectedRetailId+'retailer id');

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
				

				if(vResultBCP && vResultSelf) {
					console.log('MASUK IF:');
					let vResultAll = {
						'status' : 0,
						'statusMessage' : '',
						'totalRecord' : vResultSelf.totalRecord,
						'totalAmount' : parseInt(vResultSelf.totalAmount)+parseInt(vResultBCP[0].amount) ,
						'selfTransactionList' : []
					};

					vResultAll.status = 200;
					vResultAll.statusMessage = 'OK';

					console.log('outstandingBalance : '+ vResultSelf.selfTransactionList.length);

						for (var i = 0 ; i < vResultSelf.selfTransactionList.length ; i++) {
							let self = {
								'retailerMIN' : vResultSelf.selfTransactionList[i].retailerMIN,
								'transactionId' : vResultSelf.selfTransactionList[i].transactionId,
								'transactionDate' : vResultSelf.selfTransactionList[i].transactionDate,
								'amount' : parseInt(vResultSelf.selfTransactionList[i].amount)
							}
							vResultAll.selfTransactionList.push(self);
						}
						pResponse.status(200).json(vResultAll);
				}
				else {
					console.log('masuk else');
					let vResultAll = {
					'status' : 200,
					'statusMessage' : 'OK',
					'totalRecord' : 0,
					'totalAmount' : 0,
					'selfTransactionList' : [{
						'retailerMIN' : 0,
							'transactionId' : 0,
							'transactionDate' : 0,
							'amount' : 0
					}]
				};
					console.log('Outstanding balance : '+JSON.stringify(vResultAll));
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

	async getSuggestedOrder(pRequest, pResponse) {
		try {
			console.log('In getSuggestedOrder controller');
			var vMonth = new Date().getMonth();
			if (pRequest.query.subcat_type === 'L') {
				let vData = new DropsizeModel(pRequest.query.brand, vMonth, pRequest.params.id, pRequest.query.subcat_type);

				var vSuggestedOrder:any = await RetailerController._dataAccess.getDropSize('get_bcp_dropsize', vData);
				console.log('Result : ' + vSuggestedOrder);
				pResponse.status(200).json(vSuggestedOrder);
			} else {
				console.log('P');
			}
		}catch(pErr) {
			JSON.stringify(pErr);
			RetailerController._errorHandling.throwError(400,'Failed to get suggested order',pErr);
		}
	}

	async getCurrentBalance(pRequest, pResponse) {
		try {
			console.log('in getCurrentBalance controller');	
			let vPath:string = '/elpnet/services/idsp/retailerbalance';
			let vParams = new BalanceModel(pRequest.body.min, pRequest.body.source);
			let vResult = await RetailerController._httpService.post(APIService.APIType.ELP, vPath, null, vParams);
			pResponse.status(200).json(vResult);
		}catch(pErr) {
			RetailerController._errorHandling.throwError(400,'Failed to get balance from ELP',pErr);
		}
	}

	//}
}