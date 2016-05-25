export module APIService {

	var vEnv = process.env.NODE_ENV || "development";
	var vRequest = require('request'); 
	var vConfig = require('../config/config.json')[vEnv];
	var vCurrentContext;
	export var APIType = {
		OPISNET : vConfig.service["OPIS+"],
		ELP : vConfig.service["ELP"]	
	}

	export class HTTPService {
		constructor() {
			vCurrentContext = this;
		}

		buildDefaultHeader() {
			let vReqHeaders = {
				'Content-Type' : 'application/json'
			}
			return vReqHeaders;
		}

		post(pAPIType, pURL, pHeaders, pData) {
			console.log('POST ' + pAPIType + pURL);
			return new Promise<string>(function(pResolve, pReject){
				let vReqHeaders;
				if( !pHeaders) {
					vReqHeaders = vCurrentContext.buildDefaultHeader();
				}else {
					vReqHeaders = pHeaders;
				}
				try{
					vRequest.post({
						url : pAPIType + pURL,
						headers : vReqHeaders,
						form : JSON.stringify(pData)
					}, function(pErr, pResponse, pBody) {
						if(pErr)pReject(pErr);
						else pResolve(pBody);
					});
				}catch(pErr){
					console.log(pErr);
				}
			});
		}

		get(pAPIType, pURL, pHeaders) {
			console.log('GET ' + pAPIType + pURL);
			return new Promise<string>(function(pResolve, pReject){
				let vReqHeaders;
				if( !pHeaders) {
					vReqHeaders = vCurrentContext.buildDefaultHeader();
				}else {
					vReqHeaders = pHeaders;
				}
				vRequest.get({
					url : pAPIType + pURL,
					headers : vReqHeaders
				}, function(pErr, pResponse, pBody){
					pReject(pBody);
				});
			});
		}
	}
}