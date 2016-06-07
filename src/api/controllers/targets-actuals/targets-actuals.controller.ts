'use strict';
import {TokenService} from '../../services/token.service';
import {DataAccessService} from '../../services/data-access.service';
import {ORMService} from '../../services/orm.service';
import {APIService} from '../../services/api.service';
import {PerformanceModel} from '../../models/input/performance.model';
import {ErrorHandlingService} from '../../services/error-handling.service';

export interface TargetsActualsInterface{
	brand(pRequest,pResponse):void;
	performance(pRequest,pResponse):void;
}


export class TargetsActualsController implements TargetsActualsInterface{
	private static _errorHandling: ErrorHandlingService;
	private static _httpService: APIService.HTTPService;
	private static _dataAccess: DataAccessService;
	private vUsername: string;

    constructor() {
    	TargetsActualsController._dataAccess = new DataAccessService();
		TargetsActualsController._errorHandling = new ErrorHandlingService();
		TargetsActualsController._httpService = new APIService.HTTPService();
    }
   
    async brand(pRequest,pResponse) {
	console.log('Start getting Brands')

	try{
		var vParam ='';

		let vResult = await TargetsActualsController._dataAccess.getBrands('get_brands', null);
		console.log('All Brand : ' + JSON.stringify(vResult));

		if(vResult) {
			pResponse.json(vResult);
		}
		else {
			console.log('BRAND NOT FOUND');
		}
		
		}catch(pErr) {
			if(pErr.errorCode === 111) {
				TargetsActualsController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 111, 'INVALID_CREDENTIALS');
		}
		else if(pErr.errorCode === 112) {// 

			}
		}
	}


	async performance(pRequest,pResponse) {
	console.log("Start targets actuals");
		try{
			let vPerformanceData = new PerformanceModel(pRequest.body.salesPerson, pRequest.body.actualType, pRequest.body.brand);
			console.log('All Param : ' + JSON.stringify(vPerformanceData));
				if(vPerformanceData.validate()) {
					let vResult = await TargetsActualsController._dataAccess.getTargetsActuals('get_targets_actuals', vPerformanceData);
					console.log('All Targets : ' + JSON.stringify(vResult));
					pResponse.json(vResult);
				}else {
					TargetsActualsController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 100, 'INPUT_ERRORS', vPerformanceData.Errors);
				}
		}
		catch(pErr) {
			if(pErr.errorCode === 111) {
				TargetsActualsController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 111, 'INVALID_CREDENTIALS');
		}
		else if(pErr.errorCode === 112) {// 

			}
		}
	}
}
