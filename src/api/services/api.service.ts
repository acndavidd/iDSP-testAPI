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
			return this.request(RequestMethod.POST, pAPIType, pURL, pHeaders, pData);
		}

		get(pAPIType, pURL, pHeaders, pUrlParams?) {
			let fullUrl = pURL;
			// build params url
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
			console.log(pRequestMethod + ' ' + pURL);
			return new Promise<any>(
				function(pResolve, pReject){
					let vErrorHandlingSvc:ErrorHandling.ErrorHandlingService = new ErrorHandling.ErrorHandlingService();
					let vReqHeaders;
					if(!pHeaders) {
						vReqHeaders = vCurrentContext.buildAuthHeaders(pRequestMethod);
					}else {
						vReqHeaders = pHeaders;
					}
					let vRequestObj = {
						url : pAPIType + pURL,
						method : pRequestMethod,
						headers : vReqHeaders,
						timeout : vConfig.service["timeout"],
						body : ''
					};
					if(pRequestMethod === APIService.RequestMethod.POST) {
						vRequestObj.body = JSON.stringify(pData);
					}
					vRequest(vRequestObj, function(pErr, pResponse, pBody){
						if(pErr) {
							pReject(vErrorHandlingSvc.processHTTPError(pErr));
						}else {
							try{
								pResolve(vErrorHandlingSvc.processHTTPResult(JSON.parse(pBody)));
							}catch(pErr) {
								console.log(pErr);
								pReject(pErr);
							}
						}
					});
				}
			)
		}

        }
}