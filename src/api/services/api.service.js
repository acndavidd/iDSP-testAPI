"use strict";
const error_handling_service_1 = require('./error-handling.service');
var APIService;
(function (APIService) {
    var vEnv = process.env.NODE_ENV || "DEVELOPMENT";
    var vRequest = require('request');
    var vConfig = require('../config/config.json')[vEnv];
    APIService.APIType = {
        OPISNET: vConfig.services["OPIS+"],
        ELP: vConfig.services["ELP"]
    };
    APIService.RequestMethod = {
        POST: 'POST',
        GET: 'GET',
        PUT: 'PUT',
        DELETE: 'DELETE'
    };
    class HTTPService {
        constructor() {
            this.vErrHandling = new error_handling_service_1.ErrorHandlingService();
        }
        buildAuthHeaders(pMethod) {
            let vReqHeaders = {
                'Content-Type': 'application/json' // default request header
            };
            return vReqHeaders;
        }
        post(pAPIType, pURL, pHeaders, pData) {
            return this.request(APIService.RequestMethod.POST, pAPIType, pURL, pHeaders, pData);
        }
        get(pAPIType, pURL, pHeaders, pUrlParams) {
            let fullUrl = pURL;
            // build params url from object
            if (pUrlParams) {
                fullUrl = fullUrl + '?';
                for (let vParam in pUrlParams) {
                    fullUrl += vParam + "=" + pUrlParams[vParam] + "&";
                }
                fullUrl = fullUrl.substring(0, fullUrl.lastIndexOf('&'));
            }
            return this.request(APIService.RequestMethod.GET, pAPIType, fullUrl, pHeaders);
        }
        // Handles error caused by technical errors such as server not found, timeout etc
        handleHTTPError(pHTTPError) {
            let Error = {
                code: 0,
                desc: '' // Error Description
            };
            // format error received from request : 
            // {"code":"ECONNREFUSED","errno":"ECONNREFUSED","syscall":"connect","address":"127.0.0.1","port":5678}
            // map HTTP Error
            if (pHTTPError.code === 'ECONNREFUSED') {
                Error.code = 106;
                Error.desc = 'CONNECTION REFUSED';
            }
            else {
                console.log(pHTTPError);
            }
            return Error;
        }
        // Handles response error returned when requesting to Interface service
        handleHTTPErrorResponse(pHTTPErrorResponse) {
            let Error = {
                code: 0,
                desc: '' // Error Description
            };
            // format error received from response :
            // {
            // 	"statusCode":404,
            // 	"body":"",
            // 	"headers":{
            // 		"content-type":"text/html;charset=iso-8859-1",
            // 		"cache-control":"must-revalidate,no-cache,no-store",
            // 		"content-length":"1401",
            // 		"connection":"close",
            // 		"server":"Jetty(6.1.x)"
            // 	},
            // 	"request":{
            // 		"uri":{
            // 			"protocol":"http:",
            // 			"slashes":true,
            // 			"auth":null,
            // 			"host":"localhost:5678",
            // 			"port":"5678",
            // 			"hostname":"localhost",
            // 			"hash":null,
            // 			"search":null,
            // 			"query":null,
            // 			"pathname":"/OPISNET/services/idsp/userValidation",
            // 			"path":"/OPISNET/services/idsp/userValidation",
            // 			"href":"http://localhost:5678/OPISNET/services/idsp/userValidation"
            // 		},
            // 		"method":"POST",
            // 		"headers":{
            // 			"Content-Type":"application/json",
            // 			"content-length":42
            // 		}
            // 	}
            // }
            switch (pHTTPErrorResponse.statusCode) {
                case 404:
                    Error.code = 116;
                    Error.desc = 'SERVICE_NOT_FOUND';
                    break;
                case 403:
                    Error.code = 117;
                    Error.desc = 'FORBIDDEN_REQUEST';
                    break;
                default:
                    console.log(pHTTPErrorResponse);
                    Error.code = 120;
                    Error.desc = "UNHANDLED_ERROR";
                    break;
            }
            return Error;
        }
        request(pRequestMethod, pAPIType, pURL, pHeaders, pData) {
            console.log(pRequestMethod + ' ' + pAPIType + pURL);
            let vCurrentContext = this;
            return new Promise(function (pResolve, pReject) {
                try {
                    let vReqHeaders;
                    if (!pHeaders) {
                        vReqHeaders = vCurrentContext.buildAuthHeaders(pRequestMethod);
                    }
                    else {
                        vReqHeaders = pHeaders;
                    }
                    // build request object
                    let vRequestObj = {
                        url: pAPIType + pURL,
                        method: pRequestMethod,
                        headers: vReqHeaders,
                        timeout: vConfig.services["timeout"],
                        body: ''
                    };
                    if (pRequestMethod === APIService.RequestMethod.POST) {
                        vRequestObj.body = JSON.stringify(pData);
                    }
                    vRequest(vRequestObj, function (pErr, pResponse, pBody) {
                        if (pErr) {
                            this.handleHTTPError(pErr);
                        }
                        else {
                            if (pResponse.statusCode === 200) {
                                // console.log(JSON.parse(pBody));
                                pResolve(JSON.parse(pBody));
                            }
                            else {
                                console.log('Response : ' + pResponse.statusCode);
                                let vError = vCurrentContext.handleHTTPErrorResponse(pResponse);
                                vCurrentContext.vErrHandling.throwPromiseError(pReject, vError.code, vError.desc);
                            }
                        }
                    });
                }
                catch (pErr) {
                    console.log('Error : ' + pErr);
                    vCurrentContext.vErrHandling.throwPromiseError(pReject, 112, pErr.toString());
                }
            });
        }
    }
    APIService.HTTPService = HTTPService;
})(APIService = exports.APIService || (exports.APIService = {}));
//# sourceMappingURL=api.service.js.map