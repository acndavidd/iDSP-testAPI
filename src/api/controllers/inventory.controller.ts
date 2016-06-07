'use strict';

import {TokenService} from '../services/token.service';
import {ORMService} from '../services/orm.service';
import {APIService} from '../services/api.service';

import {ErrorHandlingService} from '../services/error-handling.service';

import {DataAccessService} from '../services/data-access.service';
import {DspInventoryModel} from '../models/input/dsp-inventory.model';


export interface InventoryInterface {
	physical(pRequest, pResponse):Promise<void>;
	load(pRequest, pResponse):Promise<void>;
}

export class InventoryController implements InventoryInterface {
	

	private static _errorHandling: ErrorHandlingService;
	private static _httpService: APIService.HTTPService;
	private static _dataAccess: DataAccessService;
	private vUsername: string;

	constructor() {
		InventoryController._dataAccess = new DataAccessService();
		InventoryController._errorHandling = new ErrorHandlingService();
		InventoryController._httpService = new APIService.HTTPService();
	}


	async physical(pRequest,pResponse) {
		try{
			let vHttpSvc = new APIService.HTTPService();
			let vPath:string = '/OPISNET/services/idsp/DSPinventory';
			let vDspInventoryData = new DspInventoryModel(
				pRequest.query.username,
				pRequest.query.type);

			if(vDspInventoryData.validate()) {
				console.log(vDspInventoryData);
				let vResult = await vHttpSvc.get(APIService.APIType.OPISNET, vPath, null, vDspInventoryData);
				console.log('KELUAR PHYSICAL SINI : ' +vResult.status+ ', pay : ' +JSON.stringify(vResult));
				pResponse.status(vResult.status).json(vResult);
			}else {

			}
		}catch(pErr){
			if(pErr.errorCode == 101) {
			}
		}
	}

	async load(pRequest,pResponse) {
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
				
			}
		}catch(pErr){
			if(pErr.errorCode == 101) {
			}
		}
	}

}