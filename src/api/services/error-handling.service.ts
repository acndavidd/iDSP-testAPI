var ErrorConfig = require('../config/error.json');

export interface ErrorHandlingInterface {
	throwHTTPErrorResponse(HTTPResponseObject: any, HTTPResponseStatus: number, errorCode: number, errorDescription: string, inputError?: any): void;
	throwError(errorCode: number, errorDescription: string, inputError?: any): Object;
	throwPromiseError(RejectFunction: Function, errorCode: number, errorDescription: string, inputErr?: any): void;
}

export class ErrorHandlingService implements ErrorHandlingInterface {

	buildErrorObject(errorCode: number, errorDescription: string, inputError?: any): Object{
		// build error object

		// get error message in the config file if error description exists
		// if not, just use the passed errorDescription parameter
		if(ErrorConfig[errorDescription]){
			errorDescription = ErrorConfig[errorDescription];
		}
		let Error = {
			code: errorCode,
			desc: errorDescription
		};
		// if input errors (errors generated from class validator that is used in model) is passed
		if(inputError) {
			Error.inputError = inputError;
		}
		return Error;
	}

	throwPromiseError(RejectFunction: Function, errorCode: number, errorDescription: string, inputError?: any) {
		RejectFunction(this.buildErrorObject(errorCode, errorDescription, inputError));
	}

	throwError(errorCode: number, errorDescription: string, inputError?: any): Object {
		throw this.buildErrorObject(errorCode, errorDescription, inputError);
	}

	throwHTTPErrorResponse(HTTPResponseObject: any, HTTPResponseStatus: number, errorCode: number, errorDescription: string, inputError?: any): void {
		/**************************************************/
		/* HTTPResponseStatus Possible value :            */
		/* 	 -- 400: System Error / Technical Error       */
		/*   -- 500: Non System Error / Functional Error  */
		/**************************************************/
		HTTPResponseObject.status(HTTPResponseStatus).json(this.buildErrorObject(errorCode, errorDescription, inputError));
	}
}