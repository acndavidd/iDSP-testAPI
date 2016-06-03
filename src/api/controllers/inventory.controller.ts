'use strict';

import {TokenService} from '../services/token.service';
import {ORMService} from '../services/orm.service';
import {APIService} from '../services/api.service';
import {ErrorHandling} from '../services/error-handling.service';
import {DspInventoryModel} from '../models/input/dsp-inventory.model';

export class InventoryController{
	
	constructor(){
	}

	// dspPhysicalInventoryList(pRequest,pResponse){
	// 	console.log("masukk sini pak");
	// 	var vResult;
	// 	try{
	// 		vResult = {
	// 			status : "SUCCESS",
	// 			statusMessage : "BERHASIL BERHASIL HORE",
	// 			productList : [{
	// 				productID : "10001",
	// 				productName : "SKU1",
	// 				beginningBalance : "500",
	// 				newDelivery : "100",
	// 				sold : "100",
	// 				transferBack : "100",
	// 				endingBalance : "500",
	// 				dateModified : "20160429003012"
	// 			},{
	// 				productID : "10002",
	// 				productName : "SKU2",
	// 				beginningBalance : "700",
	// 				newDelivery : "100",
	// 				sold : "100",
	// 				transferBack : "100",
	// 				endingBalance : "700",
	// 				dateModified : "20160429003012"
	// 			}]
	// 		};
	// 	}catch(err){
	// 		vResult = {
	// 			status : "ERROR",
	// 			statusMessage : "GAGAL BRO",
	// 			productList : {
	// 			}
	// 		};
	// 	}
	// 	pResponse.json(vResult);
	// }

	async physical(pRequest,pResponse) {
		let vErrHandling:ErrorHandling.ErrorHandlingService = new ErrorHandling.ErrorHandlingService();
		try{
			let vHttpSvc = new APIService.HTTPService();
			let vPath:string = '/OPISNET/services/idsp/DSPinventory';
			let vDspInventoryData = new DspInventoryModel(
				pRequest.query.username,
				pRequest.query.type);

			if(vDspInventoryData.validate()) {
				console.log(vDspInventoryData);
				let vResult = await vHttpSvc.get(APIService.APIType.OPISNET, vPath, null, vDspInventoryData);
				console.log('KELUAR PHYSICAL SINI : ' +vResult.status+ ', pay : ' +JSON.stringify(vResult.payload));
				pResponse.status(vResult.status).json(vResult.payload);
			}else {
				vErrHandling.throwError(pResponse, ErrorHandling.RESPONSE_CODE.FUNCTIONAL_ERROR, ErrorHandling.ERROR_TYPE.INPUT_ERROR, "ERR_INVALID_CREDENTIAL");
			}
		}catch(pErr){
			if(pErr.errorCode == 101) {
				vErrHandling.throwError(pResponse, 400, 101, "ERR_INVALID_CREDENTIAL");
			}
		}
	}

	async load(pRequest,pResponse) {
		let vErrHandling:ErrorHandling.ErrorHandlingService = new ErrorHandling.ErrorHandlingService();
		try{
			let vHttpSvc = new APIService.HTTPService();
			let vPath:string = '/OPISNET/services/idsp/DSPinventory';
			let vDspInventoryData = new DspInventoryModel(
				pRequest.query.username,
				pRequest.query.type);

			if(vDspInventoryData.validate()) {
				console.log(vDspInventoryData);
				let vResult = await vHttpSvc.get(APIService.APIType.OPISNET, vPath, null, vDspInventoryData);
				console.log('KELUAR LOAD SINI : ' +vResult.status+ ', pay : ' +JSON.stringify(vResult.payload));
				pResponse.status(vResult.status).json(vResult.payload);
			}else {
				vErrHandling.throwError(pResponse, ErrorHandling.RESPONSE_CODE.FUNCTIONAL_ERROR, ErrorHandling.ERROR_TYPE.INPUT_ERROR, "ERR_INVALID_CREDENTIAL");
			}
		}catch(pErr){
			if(pErr.errorCode == 101) {
				vErrHandling.throwError(pResponse, 400, 101, "ERR_INVALID_CREDENTIAL");
			}
		}
	}
}