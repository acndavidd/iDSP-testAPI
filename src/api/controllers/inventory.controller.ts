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
			let vPhysicalInventoryData = new Inventory.PhysicalInventory(
				pRequest.query.username, 
				pRequest.query.recordstart, 
				pRequest.query.recordend, 
				null);

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

			let vLoadInventoryData = new Inventory.LoadInventory(
				pRequest.query.username,
				null,
				pRequest.query.corporateid,
				pRequest.query.branchid,
				pRequest.query.transactionkey,
				pRequest.query.requestrefno,
				pRequest.query.requesttimestamp,
				pRequest.query.terminalid,
				pRequest.query.address,
				pRequest.query.zipcode);

			// OPIS+
			try {
				if (vLoadInventoryData.validate()) {
					let vResult = await vHttpSvc.get(APIService.APIType.OPISNET, vPathOPIS, null, vLoadInventoryData.paramDSPOpis);
					pResponse.status(vResult.status).json(vResult);
					console.log('OPISSSS : ' + JSON.stringify(vResult));
				} else {
					
				}
			} catch(pErr) {
				if(pErr.errorCode == 101) {
				}
			}

			// ELP SMART
			try {
				if (vLoadInventoryData.validate()) {
					let vResult = await vHttpSvc.get(APIService.APIType.ELP, vPathELP, null, vLoadInventoryData.paramDSPElpSmart);
					console.log('ELP SMART : ' + JSON.stringify(vResult));
				} else {
					
				}
			} catch(pErr) {
				if(pErr.errorCode == 101) {
				}
			}

			// ELP SUN
			try {
				if (vLoadInventoryData.validate()) {
					let vResult = await vHttpSvc.get(APIService.APIType.ELP, vPathELP, null, vLoadInventoryData.paramDSPElpSun);
					console.log('ELP SUN : ' + JSON.stringify(vResult));
				} else {
					
				}
			} catch(pErr) {
				if(pErr.errorCode == 101) {
				}
			}

			// DB
			


		} catch(pErr) {
			if(pErr.errorCode == 101) {
			}
		}
	}

}