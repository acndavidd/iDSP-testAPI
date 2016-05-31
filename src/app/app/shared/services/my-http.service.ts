'use strict';

import {Injectable} from 'angular2/core';
import {Http, Request, RequestOptions, RequestMethod, RequestOptionsArgs, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Router} from 'angular2/router';
import {Modal} from './modal.service';

declare var configChannel: any;

@Injectable()
export class MyHttp {
    private vServiceBaseUrl: string;
    private vTimeout: number;

    constructor(private _http: Http,
                private _router: Router,
                private _modalService: Modal.ModalService) {

        this.vServiceBaseUrl = '';

        /* Read Config
        const URL = 'config/service.json';
        this.vServiceBaseUrl = '';
        this._http.get(URL,
            <RequestOptionsArgs> {
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded',
                })
            })
           .subscribe(file => {
               let vConfig = file.json();
               this.vServiceBaseUrl = vConfig.baseUrl;
               this.vTimeout = Number(vConfig.timeout);

           });
        */
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

    private _createAuthHeaders(pMethod: RequestMethod): Headers {
        let vHeaders: Headers = new Headers();
        if (pMethod !== RequestMethod.Get) {
            vHeaders.append('Content-Type', 'application/json');
        }
        if (configChannel !== 'web') {
            let vAccessToken = localStorage.getItem('accessToken');
            if (vAccessToken) {
                vHeaders.append('Authorization', 'Bearer ' + vAccessToken);
            }
        }
        return vHeaders;
    }


    private _request(pMethod: RequestMethod, pUrl: string, pBody?: string, pOptions?: RequestOptionsArgs): Observable<any> {
        let vRequestOptions = new RequestOptions({
            method: pMethod,
            body: pBody
        });
        // using custom options
        if (pOptions) {
            for (let vAttrname in pOptions) {
                vRequestOptions[vAttrname] = pOptions[vAttrname];
            }
        } else {
            vRequestOptions.headers = this._createAuthHeaders(pMethod);
        }

        return Observable.create((pObserver) => {
            const CONFIG_URL = 'config/service.json';
            if (this.vServiceBaseUrl === '') {
                this._http.get(CONFIG_URL,
                <RequestOptionsArgs> {
                    headers: new Headers({
                        'Content-Type': 'application/x-www-form-urlencoded',
                    })
                })
               .subscribe(file => {
                   let vConfig = file.json();
                   this.vServiceBaseUrl = vConfig.baseUrl;
                   this.vTimeout = Number(vConfig.timeout);
                   vRequestOptions.url = this.vServiceBaseUrl + pUrl;
                   this.executeRequest(pObserver, vRequestOptions);
               });
            } else {
                vRequestOptions.url = this.vServiceBaseUrl + pUrl;
                this.executeRequest(pObserver, vRequestOptions);
            }
        });
    }

    public executeRequest(pObserver, pOpt: RequestOptions) {
        console.log('Start request to ' + pOpt.url);
        this._http.request(new Request(pOpt))
            .timeout(this.vTimeout, {status: 408})
            .subscribe(
                (res) => {
                    pObserver.next(res);
                    pObserver.complete();
                },
                (err) => {
                    switch (err.status) {
                        case 403:
                            // caused by invalid token send to server
                            // try access once again using refresh token
                            pObserver.error(err);
                            break;
                        case 400:
                            if(err.errorCode === 101) { // input error
                                pObserver.error(err.inputError);
                            }else {
                                pObserver.error(err.body);
                            }
                            break;
                        default:
                            // throw error
                            pObserver.error(err);
                            break;
                    }
                });
    }
}
