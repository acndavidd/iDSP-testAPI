import {APIService} from '../../../services/api.service';
import {ErrorHandlingService} from '../../../services/error-handling.service';
import {TokenService} from '../../../services/token.service';

import {TokenObject} from '../../../models/token.model';

export interface RetailerThreshold {
	getRetailerThreshold(pRequest, pResponse): Promise<void>;
}

export class RetailerThreshold {

	private static _errorHandling: ErrorHandlingService;
	private static _httpService: APIService.HTTPService;

	constructor() {
		RetailerThreshold._errorHandling = new ErrorHandlingService();
		RetailerThreshold._httpService = new APIService.HTTPService();
	}

	async getRetailerThreshold(pRequest, pResponse) {
		try{
			let serviceURL: string = '/opisnet/services/idsp/dspalert';
			let vTokenService = new TokenService();
			let vTokenObject = new TokenObject(null, null, null, null);
			let vToken = pResponse.locals.accessToken;
			vTokenObject = vTokenService.decryptToken(vToken);
			console.log(vTokenObject);
			let params = {
				username : vTokenObject.getDSPId()
			};
			console.log(params);
			let vPayLoad = await RetailerThreshold._httpService.post(APIService.APIType.OPISNET, serviceURL, null, params);
			if(vPayLoad.status === 200) {
				pResponse.status(200).json(vPayLoad);
			}else { // api call success but error on the logic
				
			}
		}catch(pErr) {

			if(pErr.code) {
				RetailerThreshold._errorHandling.throwHTTPErrorResponse(pResponse, 400, pErr.code, pErr.desc);
			}else {
				RetailerThreshold._errorHandling.throwHTTPErrorResponse(pResponse, 400, 103, pErr);
			}
		}
	}
}