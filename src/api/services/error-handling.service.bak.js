// var ErrorConfig = require('../config/error.json');
// export interface ErrorHandlingInterface {
// 	throwHTTPErrorResponse(HTTPResponseObject: any, HTTPResponseStatus: number, errorCode: number, errorDescription: string, inputError?: any): void;
// 	throwError(errorCode: number, errorDescription: string, inputError?: any): Object;
// }
// export class ErrorHandlingService implements ErrorHandlingInterface {
// 	constructor() {
// 	}
// 	buildErrorObject(errorCode: number, errorDescription: string, inputError?: any): Object{
// 		// build error object
// get error message in the config file if error description exists
// if not, just use the passed errorDescription parameter
// if(ErrorConfig[errorDescription]){
// 	errorDescription = ErrorConfig[errorDescription];
// }
// let Error = {
// 	code: errorCode,
// 	desc: errorDescription,
// 	inputError : inputError
// };
// // if input errors (errors generated from class validator that is used in model) is passed
// if(!inputError) {
// 	delete Error.inputError;
// }
// return Error;
// 		// get error message in the config file if error description exists
// 		// if not, just use the passed errorDescription parameter
// 		if(ErrorConfig[errorDescription]){
// 			errorDescription = ErrorConfig[errorDescription];
// 		}
// 		let Error = {
// 			code: errorCode,
// 			desc: errorDescription
// 		};
// 		// if input errors (errors generated from class validator that is used in model) is passed
// 		if(inputError) {
// 			Error.inputError = inputError;
// 		}
// 		return Error;
// 	}
// 	throwError(errorCode: number, errorDescription: string, inputError?: any): Object {
// 		throw this.buildErrorObject(errorCode, errorDescription, inputError);
// 	}
// 	throwHTTPErrorResponse(HTTPResponseObject: any, HTTPResponseStatus: number, errorCode: number, errorDescription: string, inputError?: any): void {
// 		/**************************************************/
// 		/* HTTPResponseStatus Possible value :            */
// 		/* 	 -- 400: System Error / Technical Error       */
// 		/*   -- 500: Non System Error / Functional Error  */
// 		/**************************************************/
// 		HTTPResponseObject.status(HTTPResponseStatus).json(this.buildErrorObject(errorCode, errorDescription, inputError));
// 	}
// } 
//# sourceMappingURL=error-handling.service.bak.js.map