import {ErrorHandlingService} from '../../services/error-handling.service';
import {APIService} from '../../services/api.service';
import {TokenService} from '../../services/token.service';
import {Account} from '../../models/input/account/account.model';
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
				let vLoginServiceURL: string = '/OPISNET/services/idsp/userValidation';
				let vPayLoad = await AccountController._httpService.post(APIService.APIType.OPISNET, vLoginServiceURL, null, vAccount);
				pResponse.status(200).json(vPayLoad.MPIN);
			}else {// Input Errors
				AccountController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 100, 'INPUT_ERRORS', vAccount.Errors);
			}
		}catch(pErr) {
			if(pErr.errorCode === 111) {// Invalid credentials error
				AccountController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 111, 'INVALID_CREDENTIALS');
			}else if(pErr.errorCode === 112) {// 

			}
		}
	}

	async submitMPIN(pRequest:any, pResponse:any): Promise<void> {
		
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