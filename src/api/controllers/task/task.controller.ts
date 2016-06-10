'use strict';
import {ORMService} from '../../services/orm.service';
import {APIService} from '../../services/api.service';
import {ErrorHandlingService} from '../../services/error-handling.service';
import {TokenService} from '../../services/token.service';

// import your model here
import {AccountReceivableModel} from '../../models/input/account-receivables.model';
import {RetailerOutputModel} from '../../models/output/retailer.model';
import {RouteDayOutputModel} from '../../models/output/route-day.model';
import {PhysicalInventoryModel} from '../../models/input/inventory/physical-inventory.model';
import {RetailerModel} from '../../models/input/retailer.model';
import {TokenObject} from '../../models/token.model';
import {DataAccessService} from '../../services/data-access.service';
//import {ErrHandlerService} from '../services/err.handler.service';

export interface TaskInterface{
	task(pRequest, pResponse):Promise<void>;
	// physicalInventory(pRequest, pResponse):Promise<void>;
	// paymentHistory(pRequest, pResponse):Promise<void>;
	collection(pRequest, pResponse):Promise<void>;
	additionalRetailerRoute(pRequest, pResponse):Promise<void>;
}


export class TaskController implements TaskInterface {
	private static _errorHandling: ErrorHandlingService;
	private static _httpService: APIService.HTTPService;
	private static _dataAccess: DataAccessService;
	private vUsername: string;

	constructor() {
		TaskController._dataAccess = new DataAccessService();
		TaskController._errorHandling = new ErrorHandlingService();
		TaskController._httpService = new APIService.HTTPService();
	}
	

	async task(pRequest, pResponse) {
			console.log("Start getting retailer route for BCP");
			var vSalesPerson = pRequest.query.username;
			var vResultData: any = [];
			try{
				
				let vPath:string = '/OPISNET/services/idsp/AllRT';
				let vRetailerData = new RetailerModel(vSalesPerson);

				if(vRetailerData.validate()) {

					// Catch result from API
					let vResult = await TaskController._httpService.get(APIService.APIType.OPISNET, vPath, null, vRetailerData);

					console.log('total record : '+JSON.stringify(vResult.recordCount));
					
					var vTotalRetailer = vResult.recordCount;
					var vAllRetailers= [];

					// Start getting the retailer details

					if (vTotalRetailer > 0 ){
						for(var i = 0; i < vResult.recordCount; i++) {
								var vRetailerAsJSON = new RetailerOutputModel(vResult.retailerList[i].retailerId, vResult.retailerList[i].storeName, vResult.retailerList[i].outletType, vResult.retailerList[i].retailerMinDetails, vResult.retailerList[i].retailerAddress, vResult.retailerList[i].numberofSELFTransaction, vResult.retailerList[i].numberofAgingSELFTransaction, vResult.retailerList[i].totalAmountofSELFTransaction, vResult.retailerList[i].dspId, vResult.retailerList[i].dspName).param_to_db;

								vAllRetailers = vAllRetailers.concat(vRetailerAsJSON);
							}
							console.log('param bcp'+JSON.stringify(vAllRetailers));

						try {	

							vResultData = await TaskController._dataAccess.getRouteDay('get_route_day', vAllRetailers ,true);

							console.log('HASILLL : '+JSON.stringify(vResultData[0].getroute.route_id));
							let vResultAll = {
								'status' : 200,
								'statusMessage' : '',
								'taskList' : []
							};

							vResultAll.status = 200;
							vResultAll.statusMessage = 'OK';

							for (var i = 0 ; i < vResultData.length ; i++) {
									let self = {
										'route_id' : vResultData[i].getroute.route_id,
										'call_status' : vResultData[i].getroute.call_status,
										'dsp_id' : vResultData[i].getroute.dsp_id,
										'freq_map_id' : vResultData[i].getroute.freq_map_id,
										'sequence_no' : vResultData[i].getroute.sequence_no,
										'retailer_id' : vResultData[i].getroute.retailer_id,
										'store_name' : vResultData[i].getroute.store_name,
										'outlet_type' : vResultData[i].getroute.outlet_type,
										'retailer_min' : vResultData[i].getroute.retailer_min,
										'retailer_address' : vResultData[i].getroute.retailer_address,
										'number_of_self_transaction' : vResultData[i].getroute.number_of_self_transaction,
										'number_of_aging_self_transaction' : vResultData[i].getroute.number_of_aging_self_transaction,
										'total_amount_self_transaction' : parseInt(vResultData[i].getroute.total_amount_self_transaction),
										'dsp_name' : vResultData[i].getroute.dsp_name

									}
									vResultAll.taskList.push(self);
								}
							console.log('All result ' + JSON.stringify(vResultAll));
							pResponse.json(vResultAll.taskList.sort(function(a, b) {
									if (a.sequence_no === null && b.sequence_no === null) {
										return 0;
									}
									if (a.sequence_no === null) {
										return 1;
									}
									if (b.sequence_no === null) {
										return -1;
									}
									if (parseInt(a.sequence_no) > parseInt(b.sequence_no)) {
										return 1;
									}
									if (parseInt(a.sequence_no) < parseInt(b.sequence_no)) {
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
					TaskController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 101, "INPUT_ERROR", vRetailerData.Errors);
				}
			}catch(pErr){
				console.log(pErr);
				if(pErr.errorCode == 101) {
					TaskController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 101, "ERR_INVALID_CREDENTIAL");
				}
			}
	}


	async collection(pRequest,pResponse) {
		console.log("Start getting collection");

					var vSalesPerson = 'DSP00001';
					var vRetailerId = pRequest.params.id;
			try{
				let vParam = new PhysicalInventoryModel(vSalesPerson, vRetailerId);
				console.log('Param Physical Inventory : ' + JSON.stringify(vParam));
					if(vParam.validate()) {
						let vResult = await TaskController._dataAccess.getCollection('get_collection', vParam);
						console.log('Collection : ' + JSON.stringify(vResult));
						pResponse.json(vResult);
					}else {
						TaskController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 100, 'INPUT_ERRORS', vParam.Errors);
					}
			}
			catch(pErr) {
				if(pErr.errorCode === 111) {
					TaskController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 111, 'INVALID_CREDENTIALS');
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