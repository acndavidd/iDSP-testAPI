"use strict";
var ErrorConfig = require('../config/error.json');
class ErrorHandlingService {
    buildErrorObject(errorCode, errorDescription, inputError) {
        // build error object
        // get error message in the config file if error description exists
        // if not, just use the passed errorDescription parameter
        if (ErrorConfig[errorDescription]) {
            errorDescription = ErrorConfig[errorDescription];
        }
        let Error = {
            code: errorCode,
            desc: errorDescription,
            inputError: inputError
        };
        // if input errors (errors generated from class validator that is used in model) is passed
        if (!inputError) {
            delete Error.inputError;
        }
        return Error;
    }
    throwPromiseError(RejectFunction, errorCode, errorDescription, inputError) {
        RejectFunction(this.buildErrorObject(errorCode, errorDescription, inputError));
    }
    throwError(errorCode, errorDescription, inputError) {
        throw this.buildErrorObject(errorCode, errorDescription, inputError);
    }
    throwHTTPErrorResponse(HTTPResponseObject, HTTPResponseStatus, errorCode, errorDescription, inputError) {
        /**************************************************/
        /* HTTPResponseStatus Possible value :            */
        /* 	 -- 400: System Error / Technical Error       */
        /*   -- 500: Non System Error / Functional Error  */
        /**************************************************/
        HTTPResponseObject.status(HTTPResponseStatus).json(this.buildErrorObject(errorCode, errorDescription, inputError));
    }
}
exports.ErrorHandlingService = ErrorHandlingService;
//# sourceMappingURL=error-handling.service.js.map