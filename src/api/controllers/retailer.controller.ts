'use strict';
import {ORMService} from '../services/orm.service';
import {APIService} from '../services/api.service';
import {ErrorHandlingService} from '../services/error-handling.service';
import {RetailerModel} from '../models/input/retailer.model';
import {RetailerOutputModel} from '../models/output/retailer.model';
import {RouteDayOutputModel} from '../models/output/route-day.model';
//import {ErrHandlerService} from '../services/err.handler.service';

export interface RetailerInterface{
	getProduct(pRequest, pResponse):void;
	getRetailerSummary(pRequest, pResponse):Promise<void>;
	getSalesRoute(pRequest, pResponse):Promise<void>;
	// task(pRequest, pResponse):Promise<void>;
	retailerCallPreparation(pRequest, pResponse):Promise<void>;
	getAllRetailerAlert(pRequest, pResponse):Promise<void>;
	loadWallet(pRequest, pResponse):Promise<void>;
	physicalInventory(pRequest, pResponse):Promise<void>;
	paymentHistory(pRequest, pResponse):Promise<void>;
	// additionalRetailerRoute(pRequest, pResponse):Promise<void>;
}


export class RetailerController implements RetailerInterface {

	//private errService:ErrHandlerService = new ErrHandlerService();
	private vUsername: string;

	constructor() {
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

			var vResult = JSON.parse(await vOrmSvc.sp('get_retailer_summary', vParams ));     
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

			var vResult = await vOrmSvc.sp('get_retailer_route', vParams );
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

	// async task(pRequest, pResponse) {
	// 		console.log("Controller Start getting retailer route for BCP");

	// 		var vSalesPerson = pRequest.query.username;

	// 		let vErrHandling:ErrorHandlingService = new ErrorHandlingService();
	// 		try{
	// 			let vHttpSvc = new APIService.HTTPService();
	// 			let vPath:string = '/OPISNET/services/idsp/AllRT';
	// 			let vRetailerData = new RetailerModel(vSalesPerson);
	// 			if(vRetailerData.validate()) {

	// 				// Catch result from API
	// 				let vResult = await vHttpSvc.get(APIService.APIType.OPISNET, vPath, null, vRetailerData);
	// 				var vRetailer = vResult.payload.RetailerList;
	// 				var vAllRetailers= [];

	// 				// Start getting the retailer details
	// 				for(var i = 0; i < vResult.payload.RetailerList.length; i++) {
	// 						var vRetailerAsJSON = new RetailerOutputModel(vResult.payload.RetailerList[i].retailerId, vResult.payload.RetailerList[i].storeName, vResult.payload.RetailerList[i].outletType, vResult.payload.RetailerList[i].retailerMinDetails, vResult.payload.RetailerList[i].retailerAddress, vResult.payload.RetailerList[i].numberofSELFTransaction, vResult.payload.RetailerList[i].numberofAgingSELFTransaction, vResult.payload.RetailerList[i].totalAmountofSELFTransaction, vResult.payload.RetailerList[i].dspId, vResult.payload.RetailerList[i].dspName).param_to_db;

	// 						vAllRetailers = vAllRetailers.concat(vRetailerAsJSON);
	// 					}
						
	// 				try {	
	// 					// Start getting the route day from store procedure										
	// 					let vOrmService:ORMService = new ORMService();
	// 					let vResultData = await vOrmService.sp('get_route_day', vAllRetailers ,true);
	// 					console.log('All result ' + JSON.stringify(vResultData.payload));
	// 					pResponse.status(vResultData.status).json(vResultData.payload.sort(function(a, b) {
	// 							if (a.getroute.sequence_no === null && b.getroute.sequence_no === null) {
	// 								return 0;
	// 							}
	// 							if (a.getroute.sequence_no === null) {
	// 								return 1;
	// 							}
	// 							if (b.getroute.sequence_no === null) {
	// 								return -1;
	// 							}
	// 							if (parseInt(a.getroute.sequence_no) > parseInt(b.getroute.sequence_no)) {
	// 								return 1;
	// 							}
	// 							if (parseInt(a.getroute.sequence_no) < parseInt(b.getroute.sequence_no)) {
	// 								return -1;
	// 							} else {
	// 								return 0;
	// 							}
	// 						}));
	// 				}
	// 				catch(pErr)
	// 				{
	// 					throw pErr;
	// 				}
				 	
	// 			}else {
	// 				vErrHandling.throwError(400, "INPUT_ERROR", vRetailerData.Errors);
	// 			}
	// 		}catch(pErr){
	// 			console.log(pErr);
	// 			if(pErr.errorCode == 101) {
	// 				vErrHandling.throwError(400, "ERR_INVALID_CREDENTIAL", pErr);
	// 			}
	// 		}
	// }

	async retailerCallPreparation(pRequest,pResponse) {
		try{
			console.log("Start getting Retailer Preparation");

			var vSalesPerson = pRequest.body.salesPerson;
			var vSelectedRetailId = pRequest.body.retailerId;

			console.log(vSelectedRetailId+'retailer id');

			var vOrmSvc = new ORMService();

			let vParams = {
				sales_person : vSalesPerson,
				selected_ret_id : vSelectedRetailId
				
			};

			var vResult = await vOrmSvc.sp('get_retailer_call_prep', vParams );
			console.log("Query Done with result : "+ JSON.stringify(vResponse));
			var vResponse = {
						"status" : "Success",
						"errorMessage" : "",
						"result" : vResult
					};
			
			pResponse.json(vResponse);
		}
		catch(pErr) {
			console.log("Failed to Query Retailer Summary with error message" + pErr);

			var vError = {
						"status" : "Error",
						"errorMessage" : pErr,
						"result" : null
					};
			pResponse.json(vError);
		}
	} 

	async getAllRetailerAlert(pRequest,pResponse){
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

	async loadWallet(pRequest,pResponse) {
		try{
			console.log("Start getting Load Wallet");

			var vSalesPerson = pRequest.body.salesPerson;
			var vSelectedRetailId = pRequest.body.retailerId;

			console.log(vSelectedRetailId+'retailer id');

			var vOrmSvc = new ORMService();

			let vParams = {
				sales_person : vSalesPerson,
				selected_ret_id : vSelectedRetailId
				
			};

			var vResult = [{
				"brand":"SmartLoad",
				"drop_size":"350",
				"last_amount_transferred":"1200",
				"transaction_date":"04/01/2016",
				"latest_balance":"1000",
				"retailer_id":"RTL00001"
			}]

			console.log("Query Done with result : "+ JSON.stringify(vResponse));
			var vResponse = {
						"status" : "Success",
						"errorMessage" : "",
						"result" : vResult
					};
			
			pResponse.json(vResponse);
		}
		catch(pErr)
		{
			console.log("Failed to Query Load Wallet with error message" + pErr);

			var vError = {
						"status" : "Error",
						"errorMessage" : pErr,
						"result" : null
					};
			pResponse.json(vError);
		}
	}

	async physicalInventory(pRequest,pResponse) {
		try{
			console.log("Start getting Physical Inventory");

			var vSalesPerson = pRequest.body.salesPerson;
			var vSelectedRetailId = pRequest.body.retailerId;

			console.log(vSelectedRetailId+'retailer id');

			var vOrmSvc = new ORMService();

			let vParams = {
				sales_person : vSalesPerson,
				selected_ret_id : vSelectedRetailId
				
			};

			var vResult = [{
				"brand":"SKU1",
				"last_qty_sold":"650",
				"transaction_date":"04/01/2016",
				"beginning_balance":"1000",
				"retailer_id":"RTL00001"
			}]

			console.log("Query Done with result : "+ JSON.stringify(vResponse));
			var vResponse = {
						"status" : "Success",
						"errorMessage" : "",
						"result" : vResult
					};
			
			pResponse.json(vResponse);
		}
		catch(pErr)
		{
			console.log("Failed to Query Physical Inventory with error message" + pErr);

			var vError = {
						"status" : "Error",
						"errorMessage" : pErr,
						"result" : null
					};
			pResponse.json(vError);
		}
	}

	async paymentHistory(pRequest,pResponse) {
		try{

			console.log("Start getting Physical Inventory");

			var vSelectedRetailId = pRequest.body.retailerId;

			console.log(vSelectedRetailId+'retailer id');

			var vOrmSvc = new ORMService();

			let vParams = {
				selected_ret_id : vSelectedRetailId,
				interval_days : 30
				
			};

			var vResult = await vOrmSvc.sp('get_payment_history', vParams );
			console.log("Query Done with result : "+ JSON.stringify(vResponse));
			var vResponse = {
						"status" : "Success",
						"errorMessage" : "",
						"result" : vResult
					};
			
			pResponse.json(vResponse);

		}
		catch(pErr)
		{
			console.log("Failed to Query Payment History" + pErr);

			var vError = {
						"status" : "Error",
						"errorMessage" : pErr,
						"result" : null
					};
			pResponse.json(vError);
		}
	}

	// async additionalRetailerRoute (pRequest,pResponse) {
	// 	try
	// 	{	

	// 		console.log("Start getting Physical Inventory");

	// 		var vSalesPerson = pRequest.body.salesPerson;
	// 		var vDay = pRequest.body.pDay;

	// 		console.log(vSalesPerson + 'DSP id');

	// 		var vOrmSvc = new ORMService();

	// 		let vParams = {
	// 			salesPerson : vSalesPerson,
	// 			pDay : vDay	
				
	// 		};

	// 		var vResult = await vOrmSvc.sp('get_additional_retailer', vParams );
	// 		console.log("Query Done with result : "+ JSON.stringify(vResponse));
	// 		var vResponse = {
	// 					"status" : "Success",
	// 					"errorMessage" : "",
	// 					"result" : vResult
	// 				};
			
	// 		pResponse.json(vResponse);

	// 	}	
	// 	catch(pErr)
	// 	{ss
	// 		console.log("Failed to Query Payment History" + pErr);

	// 		var vError = {
	// 					"status" : "Error",
	// 					"errorMessage" : pErr,
	// 					"result" : null
	// 				};
	// 		pResponse.json(vError);
	// 	}
	// }
}