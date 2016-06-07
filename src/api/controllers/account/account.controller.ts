import {ErrorHandlingService} from '../../services/error-handling.service';
import {APIService} from '../../services/api.service';
import {TokenService} from '../../services/token.service';
import {Account} from '../../models/input/account/account.model';
import {TokenObject} from '../../models/token.model';
import {DataAccessService} from '../../services/data-access.service';
import {Utility} from '../../shared/utility';


export interface AccountControllerInterface {
	authenticate(pRequest:any, pResponse:any): Promise<void>;
	submitMPIN(pRequest:any, pResponse:any): Promise<void>;
	logout(pRequest:any, pResponse:any): Promise<void>;
}

export class AccountController implements AccountControllerInterface{
	private static _errorHandling: ErrorHandlingService;
	private static _httpService: APIService.HTTPService;
	private static _dataAccess: DataAccessService;

	constructor() {
		AccountController._dataAccess = new DataAccessService();
		AccountController._errorHandling = new ErrorHandlingService();
		AccountController._httpService = new APIService.HTTPService();
	}

	async authenticate(pRequest:any, pResponse:any): Promise<void> {
		try{
			let vAccount = new Account.Account(pRequest.body.Username, pRequest.body.Password);
			if(vAccount.validate()) {
				let vLoginServiceURL: string = '/opisnet/services/idsp/userValidation';
				let vPayLoad = await AccountController._httpService.post(APIService.APIType.OPISNET, vLoginServiceURL, null, vAccount);
				if(vPayLoad.status === 200) {
					let vTokenObject = new TokenObject(vAccount.Username, '', true, false);
					// on actual case will return token and trigger sms to client number
					pResponse.status(200).json(vTokenObject);
				}else { // api call success but error on the logic
					if(vPayLoad.status === 403) { // DSP ID Not found Error
						AccountController._errorHandling.throwHTTPErrorResponse(pResponse, 500, 121, 'ERR_INVALID_CREDENTIAL');
					}
				}
			}else {// Input Errors
				AccountController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 100, 'INPUT_ERRORS', vAccount.Errors);
			}
		}catch(pErr) {
			if(pErr.code) {
				AccountController._errorHandling.throwHTTPErrorResponse(pResponse, 400, pErr.code, pErr.desc);
			}else {
				AccountController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 103, pErr);
			}
		}
	}

	async submitMPIN(pRequest:any, pResponse:any): Promise<void> {
		try{
			let vHttpSvc = new APIService.HTTPService();
			let vPath:string = '/opisnet/services/idsp/userAuthorization';
			let vMPIN = new Account.MPIN(pRequest.params.id, pRequest.body.MPIN);
			if(vMPIN.validate()) {
				let vPayLoad = await vHttpSvc.post(APIService.APIType.OPISNET, vPath, null, vMPIN);
				// if success encrypt dsp id as token object
				if(vPayLoad.status === 200) {
					let vTokenService = new TokenService();
					let vTokenObj: TokenObject = new TokenObject();
					vTokenObj.setDSPId(pRequest.params.id);
					vTokenObj.setOPISToken(vPayLoad.AccessToken);
					let vTokenStr = vTokenService.encryptToken(vTokenObj);
					// set cookie session value with token
					pResponse.cookie('accessToken', vTokenStr,{httpOnly:true});
					vPayLoad.accessToken = vTokenStr;
					delete vPayLoad.AccessToken;
					pResponse.status(200).json(vPayLoad);
				}else {
					AccountController._errorHandling.throwHTTPErrorResponse(pResponse, 500, 121, 'ERR_INVALID_MPIN');
				}
			}else {
				AccountController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 100, 'INPUT_ERRORS', vMPIN.Errors);
			}
		}catch(pErr){
			if(pErr.code) {
				AccountController._errorHandling.throwHTTPErrorResponse(pResponse, 400, pErr.code, pErr.desc);
			}else {
				AccountController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 103, pErr);
			}
		}
	}

	async logout(pRequest:any, pResponse:any): Promise<void> {

	}

	async testSP(pRequest:any, pResponse:any): Promise<void> {
		try{
			let vParams = {
				test : 100
			};
			let vSPResult = await AccountController._dataAccess.executeSP('test_sp', vParams, true);
			console.log('before sort : ' + JSON.stringify(vSPResult));
			vSPResult = Utility.sortJSON(vSPResult, 'test');
			console.log('after sort : ' + JSON.stringify(vSPResult));
			pResponse.status(200).json(vSPResult);
		}catch(pErr) {
			console.log(pErr);
		}
	}
}