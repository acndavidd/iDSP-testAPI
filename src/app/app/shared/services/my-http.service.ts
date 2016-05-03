"use strict";

import {Injectable} from 'angular2/core';
import {Http, Request, RequestOptions, RequestMethod, RequestOptionsArgs, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Router} from 'angular2/router';

declare var vConfigChannel: any;

@Injectable()
export class MyHttp {
    private vServiceBaseUrl: string;
    private vTimeout: number;         

    constructor(private _http: Http,        
                private _router: Router) {
        this.vServiceBaseUrl = '';  
        /*
        const url = 'config/service.json';
        this.vServiceBaseUrl = '';       
        this._http.get(url,        
            <RequestOptionsArgs> {        
                headers: new Headers({        
                    'Content-Type': 'application/x-www-form-urlencoded',        
                })        
            })        
           .subscribe(file => {        
               let config = file.json();
               this.vServiceBaseUrl = config.baseUrl;    
               this.timeout = Number(config.timeout);
               console.log(this.vServiceBaseUrl);    
           });*/    
    }

    public get(pUrl: string, pOptions?: RequestOptionsArgs) {
        return this._request(RequestMethod.Get, pUrl, null, pOptions);
    }

    public post(pUrl: string, pBody: string, pOptions?: RequestOptionsArgs) {
        return this._request(RequestMethod.Post, pUrl, pBody, pOptions);
    }

    public put(pUrl: string, pBody: string, pOptions?: RequestOptionsArgs) {
        return this._request(RequestMethod.Put, pUrl, pBody, pOptions);
    }

    public delete(pUrl: string, pOptions?: RequestOptionsArgs) {
        return this._request(RequestMethod.Delete, pUrl, null, pOptions);
    }

    private _createAuthHeaders(method: RequestMethod): Headers {
        let vHeaders: Headers = new Headers();
        if (method != RequestMethod.Get) {
            vHeaders.append('Content-Type', 'application/json');
        }
        if (vConfigChannel !== 'web') {
            let vAccessToken = localStorage.getItem('accessToken');
            if (vAccessToken) {
                vHeaders.append('Authorization', 'Bearer ' + vAccessToken)
            }
        }
        return vHeaders;
    }


    private _request(method: RequestMethod, url: string, body?: string, options?: RequestOptionsArgs): Observable<any> {
        let vRequestOptions = new RequestOptions({
            method: method,
            body: body
        });
        //using custom options
        if (options) {
            for (let attrname in options) {
                vRequestOptions[attrname] = options[attrname];
            }
        } else {
            vRequestOptions.headers = this._createAuthHeaders(method);
        }

        return Observable.create((pObserver) => {
            const CONFIG_URL = 'config/service.json';
            if(this.vServiceBaseUrl === ''){
                this._http.get(CONFIG_URL,        
                <RequestOptionsArgs> {        
                    headers: new Headers({        
                        'Content-Type': 'application/x-www-form-urlencoded',        
                    })        
                })        
               .subscribe(file => {        
                   let config = file.json();
                   this.vServiceBaseUrl = config.baseUrl;    
                   this.vTimeout = Number(config.timeout);
                   vRequestOptions.url = this.vServiceBaseUrl + url;
                   this.executeRequest(pObserver,vRequestOptions);
               });
            }else{
                vRequestOptions.url = this.vServiceBaseUrl + url;
                this.executeRequest(pObserver,vRequestOptions);
            }
        });
    }

    public executeRequest(pObserver , pOpt:RequestOptions){
        this._http.request(new Request(pOpt))
            .timeout(this.vTimeout,{status:408})
            .subscribe(
                (res) => {
                    pObserver.next(res);
                    pObserver.complete();
                },
                (err) => {
                    switch (err.status) {
                        case 403:
                            pObserver.error(err);
                            break;
                        default:
                            pObserver.error(err);
                            break;
                    }
                });
    }
}
