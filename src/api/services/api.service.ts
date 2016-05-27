import {ErrorHandling} from './error-handling.service';

export module APIService {

	var vEnv = process.env.NODE_ENV || "development";
	var vRequest = require('request'); 
	var vConfig = require('../config/config.json')[vEnv];
	var vCurrentContext;

	export var APIType = {
		OPISNET : vConfig.service["OPIS+"],
		ELP : vConfig.service["ELP"]	
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
			let vReqHeaders;
			if(pMethod === RequestMethod.POST) {
				vReqHeaders = {
					'Content-Type' : 'application/json'
				}
			}else {
				vReqHeaders = {
					'Content-Type' : 'application/x-www-form-urlencoded'
				}
			}
			return vReqHeaders;
		}

		post(pAPIType, pURL, pHeaders, pData) {
			console.log('POST ' + pAPIType + pURL);
			return this.request(RequestMethod.GET, pAPIType, pURL, pHeaders);
		}

		get(pAPIType, pURL, pHeaders, pUrlParams?) {
			let fullUrl = pAPIType + pURL;
			// build params url
			if(pUrlParams) {
				fullUrl = fullUrl + '?'
				for(let vParam in pUrlParams){
					fullUrl += vParam + "=" + pUrlParams[vParam] + "&";
				}
				fullUrl = fullUrl.substring(0,fullUrl.lastIndexOf('&'));
			}
			console.log("GET " + fullUrl);
			return this.request(RequestMethod.GET, pAPIType, fullUrl, pHeaders);
		}

		request(pRequestMethod, pAPIType, pURL, pHeaders) {
			return new Promise<any>(
				function(pResolve, pReject){
					let vErrorHandlingSvc:ErrorHandling.ErrorHandlingService = new ErrorHandling.ErrorHandlingService();
					let vReqHeaders;
					if(!pHeaders) {
						vReqHeaders = vCurrentContext.buildAuthHeaders(APIService.RequestMethod.GET);
					}else {
						vReqHeaders = pHeaders;
					}
					let vRequestObj = {
						url : pAPIType + pURL,
						method : pRequestMethod,
						headers : vReqHeaders,
						timeout : 5000
					};
					vRequest(vRequestObj, function(pErr, pResponse, pBody){
						if(pErr) {
							pReject(vErrorHandlingSvc.processHTTPError(pErr));
						}
						pResolve(vErrorHandlingSvc.processHTTPResult(pBody));
					});
				}
			)
			
			return new Promise<string>(function(pResolve, pReject){
				let vReqHeaders;
				if( !pHeaders) {
					vReqHeaders = vCurrentContext.buildDefaultHeader();
				}else {
					vReqHeaders = pHeaders;
				}
				vRequest.get({
					url : pUrl,
					headers : vReqHeaders
				}, function(pErr, pResponse, pBody){
					if(pErr)pReject(pErr);
					else pResolve(pBody);
				});
			});
		}

	}
}