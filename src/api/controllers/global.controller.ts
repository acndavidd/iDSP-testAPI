'use strict';
import {TokenService} from '../services/token.service';
import {DataAccessService} from '../services/data-access.service';
import {ORMService} from '../services/orm.service';
import {APIService} from '../services/api.service';
import {ErrorHandlingService} from '../services/error-handling.service';

export interface GlobalInterface{
	brand(pRequest,pResponse):void;
	productID(pRequest,pResponse):void;
}


export class GlobalController implements GlobalInterface{
	private static _errorHandling: ErrorHandlingService;
	private static _httpService: APIService.HTTPService;
	private static _dataAccess: DataAccessService;

    constructor() {
    	GlobalController._dataAccess = new DataAccessService();
		GlobalController._errorHandling = new ErrorHandlingService();
		GlobalController._httpService = new APIService.HTTPService();
    }
   
    async brand(pRequest,pResponse) {
		console.log('Start getting Brands')

		try{
			var vParam ='';

			let vResult = await GlobalController._dataAccess.getBrands('get_brands', null);
			console.log('All Brand : ' + JSON.stringify(vResult));

			if(vResult) {
				pResponse.json(vResult);
			}
			else {
				console.log('BRAND NOT FOUND');
			}
			
		}catch(pErr) {
			if(pErr.errorCode === 111) {
				GlobalController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 111, 'INVALID_CREDENTIALS');
			}
			else if(pErr.errorCode === 112) {// 
			}
		}
	}
   
    async productID(pRequest,pResponse) {
		console.log('Start getting productID')

		try{
			var vParam ='';

			let vResult = await GlobalController._dataAccess.getProductID('get_product_id', null);
			console.log('All productID : ' + JSON.stringify(vResult));

			if(vResult) {
				pResponse.json(vResult);
			}
			else {
				console.log('PRODUCT ID NOT FOUND');
			}
			
		}catch(pErr) {
			if(pErr.errorCode === 111) {
				GlobalController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 111, 'INVALID_CREDENTIALS');
			}
			else if(pErr.errorCode === 112) {// 
			}
		}
	}
}
