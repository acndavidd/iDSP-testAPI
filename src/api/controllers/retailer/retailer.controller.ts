'use strict';
import {ORMService} from '../../services/orm.service';
import {APIService} from '../../services/api.service';
import {ErrorHandlingService} from '../../services/error-handling.service';
import {TokenService} from '../../services/token.service';
import {DataAccessService} from '../../services/data-access.service';

// import your model here
import {TokenObject} from '../../models/token.model';
import {RetailerProfileModel} from '../../models/input/retailer-profile.model';
import {BalanceModel} from '../../models/input/retailer/balance.model';
import {PhysicalInventoryModel} from '../../models/input/inventory/physical-inventory.model';

//import {ErrHandlerService} from '../services/err.handler.service';

export interface RetailerInterface{
	getRetailerThreshold(pRequest, pResponse): Promise<void>;
	getProduct(pRequest, pResponse):Promise<void>;
	getRetailerSummary(pRequest, pResponse):Promise<void>;
	getSalesRoute(pRequest, pResponse):Promise<void>;
	loadWallet(pRequest, pResponse):Promise<void>;
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
			console.log(vToken);
			vTokebObject = vTokenService.decryptToken(vToken);
			let params = {
				username : vTokebObject.getDSPId()
			};
			console.log(params);
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
					let vResult = await RetailerController._dataAccess.getPhysicalInventory('get_physical_inventory', vParam);
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

	async loadWallet(pRequest,pResponse) {
		try{
			console.log("Start getting Load Wallet");

			var vSalesPerson = 'DSP00001';
			var vRetailerId = pRequest.params.id;

			// console.log(vSelectedRetailId+'retailer id');

			var vOrmSvc = new ORMService();

			let vParams = {
				sales_person : vSalesPerson,
				selected_ret_id : vRetailerId
				
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

	async getSuggestedOrder(pRequest, pResponse) {
		try {
			console.log('In retailer controller..get suggested order for : ' + pRequest.params.id);
			let vResult = {suggested_order : "1000"};
			pResponse.json({
				"status" : "Success",
				"errorMessage" : "",
				"result" : vResult
			});
		}catch(pErr) {
			RetailerController._errorHandling.throwError(400,'Failed to get suggested order',pErr);
		}
	}

	async getCurrentBalance(pRequest, pResponse) {
		try {
			let vPath:string = '/elpnet/services/idsp/retailerbalance';
			console.log('isi: ' + JSON.stringify(pRequest));
			let vMin = pRequest.body.min;
			let vSource = pRequest.body.source;
			let vParams = new BalanceModel(vMin, vSource);
			let vResult = await RetailerController._httpService.post(APIService.APIType.ELP, vPath, null, vParams);
			pResponse.json(vResult);
		}catch(pErr) {
			RetailerController._errorHandling.throwError(400,'Failed to get balance from ELP',pErr);
		}
	}

}