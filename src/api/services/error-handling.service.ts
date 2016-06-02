var vErrorConfig = require('../config/error.json');

export module ErrorHandling {

	export var RESPONSE_CODE = {
		FUNCTIONAL_ERROR : 400,
		SUCCESS : 200,
		SYSTEM_ERROR : 500
	}

	export var ERROR_TYPE = {
		ERROR_SEQUELIZE : 100,
		INPUT_ERROR : 99
	}

	export class Error{
		status;
		errorCode;
		description;
		payload;
	}

	export class Result {
		status;
		payload : {};
	}

	export interface ErrorHandlingInterface {
	}

	export class ErrorHandlingService implements ErrorHandlingInterface {
		private vError:Error;
		private vResult:Result;
		constructor() {
			this.vResult = new Result();
			this.vError = new Error();
		}

		processHTTPError(pHTTPError) {
			switch (pHTTPError.code) {
				case 'ECONNREFUSED' :
					this.vError.status = RESPONSE_CODE.SYSTEM_ERROR;
					this.vError.errorCode = 100;
					this.vError.description = "ERR_CONN_REFUSED";
					break;
				case '' : 
					break;
				default :
					this.vError.status = pHTTPError.code;
					this.vError.errorCode = pHTTPError.code;
					this.vError.description = "Unhandled error on HTTP Request";
					break;
			}
			return this.vError;
		}

		processHTTPResult(pHTTPResult) {	
			if(pHTTPResult.Status !== 200) {
				this.vError.status = RESPONSE_CODE.FUNCTIONAL_ERROR;
				this.vError.errorCode = pHTTPResult.Status;
				this.vError.description = pHTTPResult.StatusMessage;
				throw this.vError;
			}else {
				this.vResult.status = RESPONSE_CODE.SUCCESS;
				this.vResult.payload = pHTTPResult;
				return this.vResult;
			}
		}

		processModelValidationError(pValidationError) {
			this.vError.status = RESPONSE_CODE.FUNCTIONAL_ERROR;
			this.vError.errorCode = pValidationError.errorCode;
			this.vError.description = pValidationError.errorMessage;	

		}

		processSequelizeError(pResult) {
			this.vError.status = RESPONSE_CODE.SYSTEM_ERROR;
			this.vError.errorCode = ERROR_TYPE.ERROR_SEQUELIZE;
			this.vError.description = pResult.toString();
			return this.vError;
		}

		processSPResult(pResult: any) {
			if(pResult.status !== 0) {
				this.vError.status = RESPONSE_CODE.FUNCTIONAL_ERROR;
				this.vError.errorCode = pResult.error_code;
				throw this.vError;
			}else {
				this.vResult.status = RESPONSE_CODE.SUCCESS;
				this.vResult.payload = pResult.result;
				return this.vResult;
			}
		}

		throwError(pHTTPResponse, pHTTPResponseStatus, pErrorCode, pErrorMessage, pInputErrorList?) {
			this.vError.status = pHTTPResponseStatus;
			this.vError.errorCode = pErrorCode;
			let inputError;
			if(pErrorMessage.indexOf('TypeError: ') !== -1) {
				pErrorMessage = pErrorMessage.replace('TypeError: ','');
			}else if(this.getErrorMessage(pErrorMessage)){
				pErrorMessage = this.getErrorMessage(pErrorMessage);
			}
			if(pInputErrorList) {
				this.vError.payload = {
					errorCode : pErrorCode,
					description : pErrorMessage,
					inputErrors : pInputErrorList
				}
			}else {
				this.vError.payload = {
					errorCode : pErrorCode,
					description : pErrorMessage
				}
			}
			pHTTPResponse.status(this.vError.status).json(this.vError.payload);
		}

		getErrorMessage(pErrMap) {
			return vErrorConfig[pErrMap];
		}
	}
}