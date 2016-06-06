'use strict';
import {ORMService} from '../../services/orm.service';
import {APIService} from '../../services/api.service';
import {DataAccessService} from '../../services/data-access.service';
import {RetailerModel} from '../../models/input/retailer.model';
import {RetailerProfileModel} from '../../models/input/retailer-profile.model';
import {RetailerOutputProfileModel} from '../../models/output/retailer-profile.model';
import {RetailerOutputModel} from '../../models/output/retailer.model';
import {RouteDayOutputModel} from '../../models/output/route-day.model';
import {ErrorHandlingService} from '../../services/error-handling.service';
import {PhysicalInventoryModel} from '../../models/input/retailer/physical-inventory.model';

//import {ErrHandlerService} from '../services/err.handler.service';

export interface RetailerInterface{
	getProduct(pRequest, pResponse):Promise<void>;
	getRetailerSummary(pRequest, pResponse):Promise<void>;
	getSalesRoute(pRequest, pResponse):Promise<void>;
	task(pRequest, pResponse):Promise<void>;
	retailerCallPreparation(pRequest, pResponse):Promise<void>;
	getAllRetailerAlert(pRequest, pResponse):Promise<void>;
	loadWallet(pRequest, pResponse):Promise<void>;
	physicalInventory(pRequest, pResponse):Promise<void>;
	paymentHistory(pRequest, pResponse):Promise<void>;
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

	async task(pRequest, pResponse) {
			console.log("Start getting retailer route for BCP");
			var vSalesPerson = pRequest.query.username;
			try{
				
				let vPath:string = '/OPISNET/services/idsp/AllRT';
				let vRetailerData = new RetailerModel(vSalesPerson);

				if(vRetailerData.validate()) {

					// Catch result from API
					let vResult = await RetailerController._httpService.get(APIService.APIType.OPISNET, vPath, null, vRetailerData);

					console.log('total record : '+JSON.stringify(vResult.recordCount));
					
					var vTotalRetailer = vResult.recordCount;
					var vAllRetailers= [];

					// Start getting the retailer details

					if (vTotalRetailer > 0 ){
						for(var i = 0; i < vResult.recordCount; i++) {
								var vRetailerAsJSON = new RetailerOutputModel(vResult.retailerList[i].retailerId, vResult.retailerList[i].storeName, vResult.retailerList[i].outletType, vResult.retailerList[i].retailerMinDetails, vResult.retailerList[i].retailerAddress, vResult.retailerList[i].numberofSELFTransaction, vResult.retailerList[i].numberofAgingSELFTransaction, vResult.retailerList[i].totalAmountofSELFTransaction, vResult.retailerList[i].dspId, vResult.retailerList[i].dspName).param_to_db;

								vAllRetailers = vAllRetailers.concat(vRetailerAsJSON);
							}

						try {	

							let vResultData = await RetailerController._dataAccess.getRouteDay('get_route_day', vAllRetailers ,true);
							// console.log('All result ' + JSON.stringify(vResultData));
							pResponse.json(vResultData.sort(function(a, b) {
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
									} else {
										return 0;
									}
								}));
						}
						catch(pErr)
						{
							console.log('Cannot Get Data From Database');
							throw pErr;
						}
				 	}else
				 	{
				 		console.log('No Route for Today');
				 	}
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

	async retailerCallPreparation(pRequest,pResponse) {

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

	async loadWallet(pRequest,pResponse) {
		try{
			console.log("Start getting Load Wallet");

			var vSalesPerson = pRequest.body.salesPerson;
			var vSelectedRetailId = pRequest.body.retailerId;

			// console.log(vSelectedRetailId+'retailer id');

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

			// console.log("Query Done with result : "+ JSON.stringify(vResponse));
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
		console.log("Start getting Physical Inventory");

				var vSalesPerson = pRequest.body.salesPerson;
				var vRetailerId = pRequest.body.retailerId;
		try{
			let vParam = new PhysicalInventoryModel(vSalesPerson, vRetailerId);
			console.log('Param Physical Inventory : ' + JSON.stringify(vParam));
				if(vParam.validate()) {
					let vResult = await RetailerController._dataAccess.getPhysicalInventory('get_physical_inventory', vParam);
					// console.log('All Result Physical Inventory : ' + JSON.stringify(vResult));
					pResponse.json(vResult);
				}else {
					RetailerController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 100, 'INPUT_ERRORS', vParam.Errors);
				}
		}
		catch(pErr) {
			if(pErr.errorCode === 111) {
				RetailerController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 111, 'INVALID_CREDENTIALS');
		}
		else if(pErr.errorCode === 112) {// 

			}
		}
	
	}

	async collection(pRequest,pResponse) {
	console.log("Start getting collection");

				var vSalesPerson = pRequest.body.salesPerson;
				var vRetailerId = pRequest.body.retailerId;
		try{
			let vParam = new PhysicalInventoryModel(vSalesPerson, vRetailerId);
			console.log('Param Physical Inventory : ' + JSON.stringify(vParam));
				if(vParam.validate()) {
					let vResult = await RetailerController._dataAccess.getCollection('get_collection', vParam);
					// console.log('All Result Physical Inventory : ' + JSON.stringify(vResult));
					pResponse.json(vResult);
				}else {
					RetailerController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 100, 'INPUT_ERRORS', vParam.Errors);
				}
		}
		catch(pErr) {
			if(pErr.errorCode === 111) {
				RetailerController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 111, 'INVALID_CREDENTIALS');
		}
		else if(pErr.errorCode === 112) {// 

			}
		}
	}

	async additionalRetailerRoute (pRequest,pResponse) {
		try
		{	

			console.log("Start getting Physical Inventory");

			var vSalesPerson = pRequest.body.salesPerson;
			var vDay = pRequest.body.pDay;

			console.log(vSalesPerson + 'DSP id');

			var vOrmSvc = new ORMService();

			let vParams = {
				salesPerson : vSalesPerson,
				pDay : vDay	
				
			};

			var vResult = await vOrmSvc.sp('get_additional_retailer', vParams );
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
}