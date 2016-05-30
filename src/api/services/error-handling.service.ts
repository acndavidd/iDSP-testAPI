var vError = require('../config/error.json');

export module ErrorHandling {

	export var RESPONSE_CODE = {
		ERROR : 400,
		SUCCESS : 200,
	}

	export var ERROR_TYPE = {
		ERROR_SEQUELIZE : 100
	}

	export class Error{
		status;
		errorCode;
		description;
		payload;
	}

	export class Result {
		status;
		payload;
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
					this.vError.status = RESPONSE_CODE.ERROR;
					this.vError.errorCode = 100;
					this.vError.description = "ERR_CONN_REFUSED";
					break;
				case '' : 
					break;
			}
			return this.vError;
		}

		processHTTPResult(pHTTPResult) {
			if(pHTTPResult.Status !== '200') {
				throw this.vError;
			}else {
				return this.vResult;
			}
		}

		processSequelizeError(pResult) {
			this.vError.status = RESPONSE_CODE.ERROR;
			this.vError.errorCode = ERROR_TYPE.ERROR_SEQUELIZE;
			this.vError.description = pResult.toString();
			return this.vError;
		}

		processSPResult(pResult: any) {
			if(pResult.status !== 0) {
				this.vError.status = RESPONSE_CODE.ERROR;
				this.vError.errorCode = pResult.error_code;
				throw this.vError;
			}else {
				this.vResult.status = RESPONSE_CODE.SUCCESS;
				this.vResult.payload = pResult.result;
				return this.vResult;
			}
		}

		throwError(pHTTPResponse, pHTTPResponseStatus, pErrorCode, pErrorMessage) {
			pErrorMessage = pErrorMessage.replace('TypeError: ','');
			this.vError.status = pHTTPResponseStatus;
			this.vError.errorCode = pErrorCode;
			this.vError.payload = {
				errorCode : pErrorCode,
				description : pErrorMessage
			}
			pHTTPResponse.status(this.vError.status).json(this.vError.payload);
		}
	}
}