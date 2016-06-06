'use strict';

import {TokenService} from '../services/token.service';
import {ORMService} from '../services/orm.service';
import {APIService} from '../services/api.service';
import {DspInventoryModel} from '../models/input/dsp-inventory.model';

export class InventoryController{
	
	constructor(){
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