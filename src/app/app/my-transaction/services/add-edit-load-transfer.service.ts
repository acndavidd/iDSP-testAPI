import {Injectable} from 'angular2/core';
import {Router} from 'angular2/router';
import {Response, RequestOptionsArgs, Headers, Http, Connection, RequestOptions} from 'angular2/http';

@Injectable()
export class AddEditLoadTransferService {
    private vServiceUrl: string;
    private vErrorMsg: string;
    private vIsLoading: boolean;

    constructor (
        private _http: Http,
        private _router: Router) {

        this.vIsLoading = false;
    }

    getLoadingState(): boolean {
        return this.vIsLoading;
    }

    getRetailerMins(pStr) {
      console.log('In AddEditLoadTransferService service');
      return this._http.get('/retailer/' + pStr + '/mins');
    }
}