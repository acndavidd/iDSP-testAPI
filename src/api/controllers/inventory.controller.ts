'use strict';

import {TokenService} from '../services/token.service';
import {ORMService} from '../services/orm.service';
import {APIService} from '../services/api.service';

import {ErrorHandlingService} from '../services/error-handling.service';

import {DataAccessService} from '../services/data-access.service';
import {DspInventoryModel} from '../models/input/dsp-inventory.model';
import {Inventory} from '../models/input/inventory/inventory.model';


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
		try {
			let vHttpSvc = new APIService.HTTPService();
			let vPath: string = '/opisnet/services/idsp/dspphysicalinventory';
			// let vPhysicalInventoryData = new Inventory.PhysicalInventory(pRequest.query.username, '1', '5', null);
			let vPhysicalInventoryData = new Inventory.PhysicalInventory(pRequest.query.username, null, null, null);

			if (vPhysicalInventoryData.validate()) {
				let vResult = await vHttpSvc.get(APIService.APIType.OPISNET, vPath, null, vPhysicalInventoryData.paramDSP);
				pResponse.status(vResult.status).json(vResult);
			}else {

			}
		} catch(pErr) {
			if (pErr.errorCode == 101) {
			}
		}
	}

	async load(pRequest,pResponse) {

		try {
			let vHttpSvc = new APIService.HTTPService();
			let vPathOPIS: string = '/opisnet/services/idsp/dsploadinventory';
			let vPathELP: string = '/ELPNET/services/idsp/dspLoadInventory';
			let vLoadInventoryData = new Inventory.LoadInventory(pRequest.query.username, null, null, null, null, null, null, null, null, null, null);

			// OPIS+
			try {
				if (vLoadInventoryData.validate()) {
					let vResult = await vHttpSvc.get(APIService.APIType.OPISNET, vPathOPIS, null, vLoadInventoryData.paramDSPOpis);
					pResponse.status(vResult.status).json(vResult);
				} else {
					
				}
			} catch(pErr) {
				if(pErr.errorCode == 101) {
				}
			}


			// ELP
			// try {
			// 	if (vDspInventoryData.validate()) {
			// 		let vResult = await vHttpSvc.get(APIService.APIType.ELP.config, vPathELP, null, vDspInventoryData);
			// 	} else {
					
			// 	}
			// } catch(pErr) {
			// 	if(pErr.errorCode == 101) {
			// 	}
			// }

			// DB
			


		} catch(pErr) {
			if(pErr.errorCode == 101) {
			}
		}
	}

}