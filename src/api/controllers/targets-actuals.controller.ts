'use strict';

import {TokenService} from '../services/token.service';
import {ORMService} from '../services/orm.service';
import {ErrorHandling} from '../services/error-handling.service';
import {APIService} from '../services/api.service';
import {PerformanceModel} from '../models/input/performance.model';

export interface TargetsActualsInterface{
	brand(pRequest,pResponse):void;
	performance(pRequest,pResponse):void;
}


export class TargetsActualsController implements TargetsActualsInterface{

    constructor() {}
   
    async brand(pRequest,pResponse) {
	console.log('Start getting Brands')
	let vErrHandling:ErrorHandling.ErrorHandlingService = new ErrorHandling.ErrorHandlingService();
	try{
		let vOrmService:ORMService = new ORMService();
		try{
			let vResult:ErrorHandling.Result = await vOrmService.sp('get_brands', null);
			pResponse.status(vResult.status).json(vResult.payload);
		}catch(pErr) {
			console.log(pErr);
			if(pErr.errorCode == ErrorHandling.ERROR_TYPE.ERROR_SEQUELIZE){
				vErrHandling.throwError(pResponse, 400, pErr.errorCode, "Error happened on sequelize");
			}else{
				//handle other error code
				switch (pErr.errorCode) {
					case 101 :
						vErrHandling.throwError(pResponse, 400, 101, "Error b");
						break;
					}
				}
			}
		}catch(pErr) {
			vErrHandling.throwError(pResponse, 400, 101, "test message");
		}
	}


	async performance(pRequest,pResponse) {
	console.log("Start targets actuals");
	let vErrHandling:ErrorHandling.ErrorHandlingService = new ErrorHandling.ErrorHandlingService();
	try{
		let vOrmService:ORMService = new ORMService();
		try{
			let vPerformanceData = new PerformanceModel(pRequest.body.salesPerson, pRequest.body.actualType, pRequest.body.brand);
				if(vPerformanceData.validate()) {
					let vResult = await vOrmService.sp('get_target_actuals', vPerformanceData);
					pResponse.status(vResult.status).json(vResult.payload);
				}else {
					vErrHandling.throwError(pResponse, 400, 101, "INPUT_ERROR", vPerformanceData.Errors);
				}
			}catch(pErr) {
			console.log(pErr);
			if(pErr.errorCode == ErrorHandling.ERROR_TYPE.ERROR_SEQUELIZE){
				vErrHandling.throwError(pResponse, 400, pErr.errorCode, "Error happened on sequelize");
			}else{
				//handle other error code
				switch (pErr.errorCode) {
					case 101 :
						vErrHandling.throwError(pResponse, 400, 101, "Error b");
						break;
					}
				}
			}
		}catch(pErr) {
			vErrHandling.throwError(pResponse, 400, 101, "test message");
		}
	}	
}
