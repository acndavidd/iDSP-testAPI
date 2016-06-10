'use strict';

import {TokenService} from '../services/token.service';
import {ORMService} from '../services/orm.service';
import {APIService} from '../services/api.service';
import {ErrorHandlingService} from '../services/error-handling.service';
import {DataAccessService} from '../services/data-access.service';
import {Inventory} from '../models/input/inventory/inventory.model';


export interface InventoryInterface {
	physical(pRequest, pResponse):Promise<void>;
	load(pRequest, pResponse):Promise<void>;
}

export class InventoryController implements InventoryInterface {

	private static _errorHandling: ErrorHandlingService;
	private static _httpService: APIService.HTTPService;
	private static _dataAccess: DataAccessService;

	constructor() {
		InventoryController._dataAccess = new DataAccessService();
		InventoryController._errorHandling = new ErrorHandlingService();
		InventoryController._httpService = new APIService.HTTPService();
	}


	async physical(pRequest,pResponse) {
		try {
			let vHttpSvc = new APIService.HTTPService();
			let vPath: string = '/opisnet/services/idsp/dspphysicalinventory';

			let vResultAll = {
				'status' : 0,
				'statusMessage' : '',
				'productList' : []
			};

			let vPhysicalInventoryData = new Inventory.PhysicalInventory(
				pRequest.query.username, 
				pRequest.query.recordstart, 
				pRequest.query.recordend, 
				null);

			if (vPhysicalInventoryData.validate()) {
				let vResult = await InventoryController._httpService.get(APIService.APIType.OPISNET, vPath, null, vPhysicalInventoryData.paramDSP);
				// pResponse.status(vResult.status).json(vResult);
				vResultAll.status = vResult.status;
				vResultAll.statusMessage = vResult.statusMessage;

				for (var i = 0 ; i < vResult.productList.length ; i++) {

					let product = {
						'productID' : vResult.productList[i].productID,
						'productName' : vResult.productList[i].productName,
						'totalInventory' : parseInt(vResult.productList[i].beginningBalance) + parseInt(vResult.productList[i].newDelivery),
						'beginningBalance' : parseInt(vResult.productList[i].beginningBalance),
						'soldTransfer' : parseInt(vResult.productList[i].newDelivery) + parseInt(vResult.productList[i].transferBack),
						'sold' : parseInt(vResult.productList[i].sold),
						'transferBack' : parseInt(vResult.productList[i].transferBack),
						'endingBalance' : parseInt(vResult.productList[i].endingBalance),
					}

					vResultAll.productList.push(product);
				}
				pResponse.status(vResultAll.status).json(vResultAll);
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

			let vResultAll = {
				'status' : 0,
				'statusMessage' : '',
				'productList' : []
			};
			let vLoadOpis: any;
			let vLoadElpSmart: any;
			let vLoadElpSun: any;
			let vLoadDb: any;

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
					vLoadOpis = await InventoryController._httpService.get(APIService.APIType.OPISNET, vPathOPIS, null, vLoadInventoryData.paramDSPOpis);
					console.log('OPISSSS : ' + JSON.stringify(vLoadOpis));
				} else {
					
				}
			} catch(pErr) {
				if(pErr.errorCode == 101) {
				}
			}

			// ELP SMART
			try {
				if (vLoadInventoryData.validate()) {
					vLoadElpSmart = await InventoryController._httpService.get(APIService.APIType.ELP, vPathELP, null, vLoadInventoryData.paramDSPElpSmart);
					console.log('ELP SMART : ' + JSON.stringify(vLoadElpSmart));
				} else {
					
				}
			} catch(pErr) {
				if(pErr.errorCode == 101) {
				}
			}

			// ELP SUN
			try {
				if (vLoadInventoryData.validate()) {
					vLoadElpSun = await InventoryController._httpService.get(APIService.APIType.ELP, vPathELP, null, vLoadInventoryData.paramDSPElpSun);
					console.log('ELP SUN : ' + JSON.stringify(vLoadElpSun));
				} else {
					
				}
			} catch(pErr) {
				if(pErr.errorCode == 101) {
				}
			}


			// DB
			try{
				let request = {
					username : pRequest.query.username
				};
				vLoadDb = await InventoryController._dataAccess.getInventoryLoadDsp('get_inventory_load_dsp', request, false);
				console.log('All INVENTORY LOAD : ' + JSON.stringify(vLoadDb));
			}catch(pErr) {
				if(pErr.errorCode === 111) {
					InventoryController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 111, 'INVALID_CREDENTIALS');
				}
				else if(pErr.errorCode === 112) {

				}
			}

			// CONCATENATE
			if(vLoadOpis.status === 200 && vLoadElpSmart.BalanceInquiryResponse.respCode === '0000' && vLoadElpSun.BalanceInquiryResponse.respCode === '0000') {
				vResultAll.status = 200;
				vResultAll.statusMessage = 'BERHASIL';


				for (var i = 0 ; i < vLoadOpis.productList.length ; i++) {
					var dateString = vLoadOpis.productList[i].lastModified;

					var year: string;
					var month: string;
					var date: string;
					var hour: string;
					var minute: string;
					var second: string;
					var dateTimeString;

					if (dateString.length === 14) {
						year = dateString.substr(0,4);
						month = dateString.substr(4,2);
						date = dateString.substr(6,2);
						hour = dateString.substr(8,2);
						minute = dateString.substr(10,2);
						second = dateString.substr(12,2);

						dateTimeString = year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
					}


					var sold = 0;
					var dispute = 0;
					var loadWallet;
					var lastModified;

					if (vLoadOpis.productList[i].productID === 'SMARTLOAD') {
						loadWallet = vLoadElpSmart.BalanceInquiryResponse.walletBalance;
						lastModified = vLoadElpSmart.BalanceInquiryResponse.transactionTimestamp;

						for (var a = 0 ; a < vLoadDb.length ; a++) {
							if (vLoadDb[a].product_id === vLoadOpis.productList[i].productID && vLoadDb[a].status === 'sold') {
								sold = vLoadDb[a].amount;
								console.log('SMARTLOAD sold : ' +sold);
							}
							if (vLoadDb[a].product_id === vLoadOpis.productList[i].productID && vLoadDb[a].status === 'dispute') {
								dispute = vLoadDb[a].amount;
								console.log('SMARTLOAD dispute : ' +dispute);
							}
						}

					} else if (vLoadOpis.productList[i].productID === 'XPRESSLOAD') {
						loadWallet = vLoadElpSun.BalanceInquiryResponse.walletBalance;
						lastModified = vLoadElpSun.BalanceInquiryResponse.transactionTimestamp;

						for (var a = 0 ; a < vLoadDb.length ; a++) {
							if (vLoadDb[a].product_id === vLoadOpis.productList[i].productID && vLoadDb[a].status === 'sold') {
								sold = vLoadDb[a].amount;
								console.log('XPRESSLOAD sold : ' +sold);
							}
							if (vLoadDb[a].product_id === vLoadOpis.productList[i].productID && vLoadDb[a].status === 'dispute') {
								dispute = vLoadDb[a].amount;
								console.log('XPRESSLOAD dispute : ' +dispute);
							}
						}
					}

					var productID = vLoadOpis.productList[i].productID;
					var productName = vLoadOpis.productList[i].productName;
					var totalInventory = parseInt(vLoadOpis.productList[i].beginningBalance) + parseInt(vLoadOpis.productList[i].newDelivery);
					var beginningBalance = parseInt(vLoadOpis.productList[i].beginningBalance);
					var newDelivery = parseInt(vLoadOpis.productList[i].newDelivery);
					var lastModifiedBB = dateTimeString;
					var sales = sold;
					var endingBalance = totalInventory - sold;
					var currentBalance = parseInt(loadWallet);
					var lastModifiedCB = lastModified;
					var forValidation = currentBalance - endingBalance;
					var others = forValidation - dispute;

					let product = {
						'productID' : productID,
						'productName' : productName,
						'totalInventory' : totalInventory,
						'beginningBalance' : beginningBalance,
						'newDelivery' : newDelivery,
						'lastModifiedBB' : lastModifiedBB,
						'sales' : sales,
						'sold' : sold,
						'endingBalance' : endingBalance,
						'currentBalance' : parseInt(loadWallet),
						'lastModifiedCB' : lastModifiedCB,
						'forValidation' : forValidation,
						'dispute' : dispute,
						'others' : others,
					}
					vResultAll.productList.push(product);
				}

				console.log('nnnnn : ' +JSON.stringify(vResultAll));
				pResponse.status(vResultAll.status).json(vResultAll);
			}

		} catch(pErr) {
			if(pErr.errorCode == 101) {
			}
		}
	}

}