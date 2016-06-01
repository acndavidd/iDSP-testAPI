'use strict';
import {TokenService} from '../services/token.service';
import {ORMService} from '../services/orm.service';
import {APIService} from '../services/api.service';
import {ErrorHandling} from '../services/error-handling.service';
import {LoginModel} from '../models/input/login.model';
import {MPINModel} from '../models/input/mpin.model';

export interface LoginInterface {
	login(pRequest, pResponse): Promise<void>;
	submitMPIN(pRequest, pResponse): Promise<void>;
	verifyToken(pRequest, pResponse): void;
	logout(pRequest, pResponse): Promise<void>
}

export class LoginController implements LoginInterface{
	constructor() {
	}

	async testSuccess(pRequest, pResponse) {
		let vErrHandling:ErrorHandling.ErrorHandlingService = new ErrorHandling.ErrorHandlingService();
		try{
			let vOrmService:ORMService = new ORMService();
			try{
				let vResult:ErrorHandling.Result = await vOrmService.sp('SUCCESS_SP', null);
				pResponse.status(vResult.status).json(vResult.payload);
			}catch(pErr) {
				if(pErr.errorCode == ErrorHandling.ERROR_TYPE.ERROR_SEQUELIZE){
					vErrHandling.throwError(pResponse, 400, pErr.errorCode, "Error happened on sequelize");
				}else{
					// handle other error code
					switch (pErr.errorCode) {
						case 101 :
							vErrHandling.throwError(pResponse, 400, 101, "Error b");
							break;
					}
				}
			}
		}catch(pErr) {
			vErrHandling.throwError(pResponse, 400, 101, "test message");
		}
	}

	async testError(pRequest, pResponse) {
		let vErrHandling:ErrorHandling.ErrorHandlingService = new ErrorHandling.ErrorHandlingService();
		try{
			let vOrmService:ORMService = new ORMService();
			let vResult = await vOrmService.sp('ERROR_SP', null);
			pResponse.status(vResult.status).json(vResult.payload);
		}catch(pErr) {
			vErrHandling.throwError(pResponse, 400, 101, "Error SP");
		}
	}

	async testSP(pRequest, pResponse) {
		let vErrHandling:ErrorHandling.ErrorHandlingService = new ErrorHandling.ErrorHandlingService();
		try{
			let vOrmService:ORMService = new ORMService();
			let vParams = {
				test : 100
			};
			let vResult = await vOrmService.sp('test_sp', vParams, true);
			pResponse.status(vResult.status).json(vResult.payload);
		}catch(pErr) {
			if(pErr.errorCode === ErrorHandling.ERROR_TYPE.ERROR_SEQUELIZE) { // something happened with sequelize service
				vErrHandling.throwError(pResponse, ErrorHandling.RESPONSE_CODE.SYSTEM_ERROR, pErr.errorCode, pErr.description);
			}
		}
	}

	async login(pRequest,pResponse) {
		let vErrHandling:ErrorHandling.ErrorHandlingService = new ErrorHandling.ErrorHandlingService();
		try{
			let vHttpSvc = new APIService.HTTPService();
			let vPath:string = '/OPISNET/services/idsp/userValidation';
			let vLoginData = new LoginModel(pRequest.body.Username, pRequest.body.Password);
			if(vLoginData.validate()) {
				let vResult = await vHttpSvc.post(APIService.APIType.OPISNET, vPath, null, vLoginData);
				pResponse.status(vResult.status).json(vResult.payload);
			}else {
				vErrHandling.throwError(pResponse, ErrorHandling.RESPONSE_CODE.FUNCTIONAL_ERROR, ErrorHandling.ERROR_TYPE.INPUT_ERROR, vLoginData.Errors);
			}
		}catch(pErr){
			if(pErr.errorCode == 101) {
				vErrHandling.throwError(pResponse, 400, 101, "ERR_INVALID_CREDENTIAL");
			}
		}
	}

	async submitMPIN(pRequest, pResponse) {
		let vErrHandling:ErrorHandling.ErrorHandlingService = new ErrorHandling.ErrorHandlingService();
		try{
			let vHttpSvc = new APIService.HTTPService();
			let vTokenSvc = new TokenService();
			let vPath:string = '/OPISNET/services/idsp/userAuthorization';
			let vMPINData = new MPINModel(pRequest.body.Username, pRequest.body.MPIN);
			if(vMPINData.validate()) {
				let vResult = await vHttpSvc.post(APIService.APIType.OPISNET, vPath, null, vMPINData);
				// If success login , generate token for services
				let vTokenObj = {
					DSP_ID : pRequest.body.Username,
					AccessToken : vResult.payload.AccessToken
				};
				vResult.payload.accessToken = vTokenSvc.generateToken(vTokenObj);
				// Set Cookie session for web access
				pResponse.cookie('accessToken', vResult.payload.accessToken,{httpOnly:true});
				pResponse.status(vResult.status).json(vResult.payload);
			}else {
				vErrHandling.throwError(pResponse, 400, 101, "INPUT_ERROR", vMPINData.Errors);
			}
		}catch(pErr) {
			if(pErr.errCode == 101) {
				vErrHandling.throwError(pResponse, 400, 101, "ERR_INVALID_MPIN");
			}
		}
	}

	verifyToken(pRequest, pResponse) {
		let vTokenSvc = new TokenService();
		let vResult = {
			Status : 200,
			StatusMessage : "Success Bro",
			TokenObject : pResponse.locals.jwt
		};
		pResponse.json(vResult);
	}

	async logout(pRequest, pResponse) {
		let vErrHandling:ErrorHandling.ErrorHandlingService = new ErrorHandling.ErrorHandlingService();
		try {
			pResponse.clearCookie('accessToken');
			pResponse.status(200).json();
		}catch(pErr) {
			vErrHandling.throwError(pResponse, 400, 101, pErr);
		}
		
	}
}