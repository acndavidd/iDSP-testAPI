import {ErrorHandlingService} from './error-handling.service';

export module APIService {

	var vEnv = process.env.NODE_ENV || "DEVELOPMENT";
	var vRequest = require('request'); 
	var vConfig = require('../config/config.json')[vEnv];
	var vCurrentContext;

	export var APIType = {
		OPISNET : vConfig.services["OPIS+"],
		ELP : vConfig.services["ELP"]	
	}

	export var RequestMethod = {
			POST : 'POST',
			GET : 'GET',
			PUT : 'PUT',
			DELETE : 'DELETE'
	}
        
	export interface HTTPServiceInterface {
			buildAuthHeaders(pMethod): any;
	}

	export class HTTPService implements HTTPServiceInterface{

		constructor() {
				vCurrentContext = this;
		}

		buildAuthHeaders(pMethod) {
			let vReqHeaders = {
				'Content-Type' : 'application/json' // default request header
			}
			return vReqHeaders;
		}
			
		post(pAPIType, pURL, pHeaders, pData) {
			return this.request(RequestMethod.POST, pAPIType, pURL, pHeaders, pData);
		}

		get(pAPIType, pURL, pHeaders, pUrlParams?) {
			let fullUrl = pURL;
			// build params url from object
			if(pUrlParams) {
				fullUrl = fullUrl + '?'
				for(let vParam in pUrlParams){
					fullUrl += vParam + "=" + pUrlParams[vParam] + "&";
				}
				fullUrl = fullUrl.substring(0,fullUrl.lastIndexOf('&'));
			}
			return this.request(RequestMethod.GET, pAPIType, fullUrl, pHeaders);
		}

		request(pRequestMethod, pAPIType, pURL, pHeaders, pData?) {
			console.log(pRequestMethod + ' ' + pAPIType + pURL);
			let vErrorHandlingSvc = new ErrorHandlingService();
			return new Promise<any>(
				function(pResolve, pReject){
					try{
						let vReqHeaders;
						if(!pHeaders) {
							vReqHeaders = vCurrentContext.buildAuthHeaders(pRequestMethod);
						}else {
							vReqHeaders = pHeaders;
						}
						// build request object
						let vRequestObj = {
							url : pAPIType + pURL,
							method : pRequestMethod,
							headers : vReqHeaders,
							timeout : vConfig.services["timeout"],
							body : ''
						};
						if(pRequestMethod === APIService.RequestMethod.POST) {
							vRequestObj.body = JSON.stringify(pData);
						}
						vRequest(vRequestObj, function(pErr, pResponse, pBody){
							if(pErr) {
								// map HTTP Error
								let Error = {
									code: 0, // Error Code
									desc:'' // Error Description
								};
								switch (pErr.code) {
									case 'ECONNREFUSED' :
										Error.code = 101;
										Error.desc = "ERR_CONN_REFUSED";
										break;
									default :
										console.log(pErr.code);
										Error.code = 105;
										Error.desc = "Unhandled error on HTTP Request";
										break;
									}
								vErrorHandlingSvc.throwPromiseError(pReject, Error.code, Error.desc);
							}else {
								console.log(pBody);
								let vPayLoad = JSON.parse(pBody);
								if(vPayLoad.status !== 200) { // success response from client api
									vErrorHandlingSvc.throwPromiseError(pReject, 0, vPayLoad.statusMessage);
								}else {
									// no error, return the result body
									pResolve(vPayLoad);
								}
							}
						});
					}catch(pErr) {
						console.log(pErr);
						pReject(pErr);
					}
				}
			)
		}
	}
}